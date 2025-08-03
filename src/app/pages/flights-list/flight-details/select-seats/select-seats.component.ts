import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../../../services/flight/flight.service';
import { FlightFilterService } from '../../../../services/flight/flight-filter.service';
import { TosterService } from '../../../../services/common/toaster.service';
import { SearchService } from '../../../../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Seat {
  id: string;
  label?: string;
  status: 'available' | 'selected' | 'unavailable';
  position: 'left' | 'right'|'middle';
  row: number;
  column: number;
  chargeAmount?: number; 
  chargeCurrency?: string; 
    origin?: string; 
  destination?: string; 
    flightNumber?: number; 
  airline?: string; 
    
}

interface SegmentSeatMap {
  origin: string;
  destination: string;
  flightNumber: number;
  segmentRef: string;
  cabins: Cabin[];
  paxSeatSegmentCharges: any;
  airline: string;
}

interface Cabin {
  cabinType: string;
  rowStart: number;
  rowEnd: number;
  seatOrder: string[];
  facilities: any[];
  rows: Row[];
}

interface Row {
  rowNumber: number;
  seats: ApiSeat[];
}

interface ApiSeat {
  seatColumn: string;
  chargeAmount: number;
  chargeCurrency: string;
  facilities: any[];
  limitations: any[];
  paxSegmentChargeRefs: any[];
  empty: boolean;
  pantry: boolean;
  premium: boolean;
  restRoom: boolean;
  occupied: boolean;
  legRoomSeat: boolean;
  tpOptionalService: string;
}

@Component({
  selector: 'app-select-seats',
  imports: [NgClass, CommonModule, NgFor, NgIf], // Added NgFor and NgIf for dynamic content
  templateUrl: './select-seats.component.html',
  styleUrl: './select-seats.component.scss',
})
export class SelectSeatsComponent implements OnInit {
  @ViewChild('scrollContainer', { static: true })
  scrollContainer!: ElementRef<HTMLDivElement>;
  private _router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);

  rangeValue = 0;
  seatPrice = 0; // This will now be dynamic based on selected seat
  seatAssignmentFee = 0;
  nonRefundableFee = 0;

  seats: Seat[] = []; // Initialize as an empty array to be populated by API
  segmentSeatMaps: SegmentSeatMap[] = []; // To store the entire API response for seat maps
  activeSegment: SegmentSeatMap | null = null; // To track the currently selected segment

  itnearyId: string = '';
  getMainDetails: any = '';
  travelProtectionAdded = false;
  travelProtectionAmount = 1106.19;
  travelProtectionTotal: any = 0;
fareSummary: any;
selectedSeatTotal: number = 0;
serviceTaxRate: number = 0.18; // 18% GST example
serviceTaxAmount: number = 0;
finalTotal: number = 0;
SeatAssignmentFee:number=0;
  selectedAdults: number = 0;
  selectedChildren: number = 0;
  selectedInfants: number = 0;
  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private toasterService: TosterService,
    private filterService: FlightFilterService,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {
    this.route.queryParams.subscribe(({ id }) => {
      if (id) {
        this.itnearyId = id;
        console.log('Itinerary ID:', id);
      }
    });
  }

  ngOnInit(): void {
   const summary = this.flightService.getFareSummary();
  if (summary) {
    this.fareSummary = summary;

    // Travel protection
    this.travelProtectionAdded = summary.travelProtectionAdded || false;
    this.travelProtectionAmount = summary.travelProtectionTotal || 0;

    // Calculate on load
    this.updateTotalWithSeatAndServiceTax();
  } else {
    console.warn('No fare summary found.');
  }
 this.searchService.searchData$.subscribe((searchData) => {
      console.log('Received Flight Data:', searchData);
      if (searchData) {
        this.selectedAdults = searchData?.NoOfAdults ?? 0;
        this.selectedChildren = searchData?.NoOfChildren ?? 0;
        this.selectedInfants = searchData?.NoOfInfants ?? 0;
      } else {
      }
    });
    this.getAvailableSeatByItinerary();
    this.calculateTotalSeatPriceFromAllSegments()

  }


restoreSelectedSeats(): void {
  if (!this.activeSegment) return;

  const seatData = this.flightService.getseatData();
  const seatRequest = seatData?.SeatRequest || [];

  // 🟢 Reset total
  this.selectedSeatTotal = 0;

  seatRequest.forEach((segmentGroup: any) => {
    const segmentKey = Object.keys(segmentGroup)[0];
    const seatObjects = segmentGroup[segmentKey];

    seatObjects.forEach((seatEntry: any) => {
      seatEntry.SelectedSeats.forEach((seatId: string) => {
        const [label] = seatId.split('_');

        // Only restore seat selection for the **active segment**
        if (
          this.activeSegment?.origin === seatEntry.origin &&
          this.activeSegment?.destination === seatEntry.destination &&
          this.activeSegment?.flightNumber === seatEntry.flightNum
        ) {
          const seat = this.seats.find((s) => s.label === label);
          if (seat) {
            seat.status = 'selected';
          }
        }

        // ✅ Always add charge (for total) even if it's from another segment
        this.selectedSeatTotal += seatEntry.SubTotalAmnt || 0;
      });
    });
  });

  this.updateTotalWithSeatAndServiceTax();
}

calculateTotalSeatPriceFromAllSegments(): void {
  const seatData = this.flightService.getseatData();
  const seatRequest = seatData?.SeatRequest || [];

  this.selectedSeatTotal = seatRequest.reduce((sum: any, segmentGroup: { [x: string]: never[]; }) => {
    const segmentKey = Object.keys(segmentGroup)[0];
    const seats = segmentGroup[segmentKey] || [];
    return (
      sum +
      seats.reduce(
        (segSum: number, seatObj: any) => segSum + (seatObj.SubTotalAmnt || 0),
        0
      )
    );
  }, 0);

  this.updateTotalWithSeatAndServiceTax();
}




  getTravelerTotal(type: 'ADT' | 'CHD' | 'INF'): number {
  const fare = this.fareSummary?.fareSubtotal?.[type] || 0;
  return fare ;
}
  getTotalServiceCharges(): number {
  const s = this.fareSummary?.surchargeSubtotal || {};
  return (s.ADT || 0) + (s.CHD || 0) + (s.INF || 0);
}
  updateTotalWithSeatAndServiceTax(): void {
  const baseFare = this.fareSummary?.totalAmount || 0;
  const travelProtection = this.travelProtectionAdded ? this.travelProtectionAmount : 0;

  const preTax = baseFare + this.selectedSeatTotal + travelProtection;
  this.finalTotal = preTax ;
}
toggleTravelProtection(): void {
 this.travelProtectionAdded = !this.travelProtectionAdded;

  this.updateTotalWithSeatAndServiceTax();
}
getSegmentKey(index: number): string {
  const keys = ['firstseg', 'secondseg', 'thirdseg', 'fourthseg', 'fifthseg'];
  return keys[index] || `segment${index + 1}`;
}

onSeatClick(seat: Seat): void {
  const seatId = seat.chargeAmount && seat.chargeAmount > 0
    ? `${seat.label}_${seat.chargeAmount}`
    : seat.label;

  const seatFee = seat.chargeAmount || 0;

  const seatData = this.flightService.getseatData() || {};
  let seatRequest: any[] = seatData.SeatRequest || [];

  const segmentIndex = this.segmentSeatMaps.findIndex(
    (s) =>
      s.origin === seat.origin &&
      s.destination === seat.destination &&
      s.flightNumber == seat.flightNumber
  );

  const segmentKey = this.getSegmentKey(segmentIndex);

  // Find or create segment group
  let segmentGroup = seatRequest.find((entry) => entry[segmentKey]);

  if (!segmentGroup) {
    segmentGroup = { [segmentKey]: [] };
    seatRequest.push(segmentGroup);
  }

  const selectedSeatsInSegment = segmentGroup[segmentKey].length;

  // Total seat limit per segment = total passengers
  const seatLimit =
    (this.selectedAdults || 0) +
    (this.selectedChildren || 0) +
    (this.selectedInfants || 0); // remove if infants don't require seats

  const seatObject = {
    cityPairNumber: 0,
    SegmentNo: 1,
    SegmentSeqNo: 1,
    PaxCount: 1,
    SeatAssignmentFee: this.SeatAssignmentFee,
    SelectedSeatsInfo: null,
    SelectedSeats: [seatId],
    SelectedSeatsNames: `${seat.label},`,
    SubTotalAmnt: seatFee,
    origin: seat.origin,
    destination: seat.destination,
    flightNum: seat.flightNumber,
    airline: seat.airline,
  };

  if (seat.status === 'available') {
    if (selectedSeatsInSegment >= seatLimit) {
      this.toasterService.showWarning(`You can select up to ${seatLimit} seat(s) for this segment.`);
      return;
    }

    seat.status = 'selected';
    this.selectedSeatTotal += seatFee;
    segmentGroup[segmentKey].push(seatObject);
  } else if (seat.status === 'selected') {
    seat.status = 'available';
    this.selectedSeatTotal -= seatFee;

    segmentGroup[segmentKey] = segmentGroup[segmentKey].filter(
      (s: any) => !s.SelectedSeats.includes(seatId)
    );

    if (segmentGroup[segmentKey].length === 0) {
      seatRequest = seatRequest.filter((entry) => !entry[segmentKey]);
    }
  }

  // Save updated seat selection
  seatData.SeatRequest = seatRequest;
  this.flightService.setseatData(seatData);
  this.updateTotalWithSeatAndServiceTax();
}




  getSubtotal(): number {
    return this.getSelectedSeats().reduce((total, seat) => total + (seat.chargeAmount || this.seatPrice), 0);
  }

  getGrandTotal(): number {
    return (
      this.getSubtotal() 
    );
  }

  getAvailableSeatByItinerary() {
    const payload = {
      ItineraryId: this.itnearyId,
    };
    this.flightService
      .getFlightAvailableSeat(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log('res', res);
          this.getMainDetails = res?.data?.flight || '';
          this.segmentSeatMaps = res?.data?.segmentSeatMap || [];
          this.SeatAssignmentFee= res?.data?.SeatAssignementFeePerSegment || 0;
          // Set the first segment as active by default
          if (this.segmentSeatMaps.length > 0) {
            this.setActiveSegment(this.segmentSeatMaps[0]);
          }
        },
        error: (err) => {
          this.toasterService.showError(
            err.error.message ||
              'Something went wrong while fetching vendor list!'
          );
        },
      });
  }


generateSeatsForActiveSegment(): void {
  this.seats = [];
  if (!this.activeSegment) return;

  const firstCabin = this.activeSegment.cabins[0];
  if (!firstCabin) return;
 console.log("firstCabin",this.activeSegment)
  const seatOrder = firstCabin.seatOrder;
  const sectionMap = this.calculateSeatSections(seatOrder);

  firstCabin.rows.forEach(apiRow => {
    apiRow.seats.forEach(apiSeat => {
      const columnIndex = this.getColumnNumber(apiSeat.seatColumn, seatOrder);
      const section = sectionMap[apiSeat.seatColumn];
      const seat: Seat = {
        id: `${apiRow.rowNumber}-${apiSeat.seatColumn}`,
        label: `${apiRow.rowNumber}${apiSeat.seatColumn}`,
        status: apiSeat.occupied ? 'unavailable' : 'available',
        position: section, // 'left', 'middle', or 'right'
        row: apiRow.rowNumber,
        column: columnIndex,
        chargeAmount: apiSeat.chargeAmount,
        chargeCurrency: apiSeat.chargeCurrency,
        origin:this.activeSegment?.origin,
        destination:this.activeSegment?.destination,
         flightNumber:this.activeSegment?.flightNumber,
        airline:this.activeSegment?.airline,


      };
      console.log("seat",seat)
      this.seats.push(seat);
    });
  });

  this.seats.sort((a, b) => {
    if (a.row !== b.row) return a.row - b.row;
    return a.column - b.column;
  });
        this.restoreSelectedSeats();

}
calculateSeatSections(seatOrder: string[]): { [seatColumn: string]: 'left' | 'middle' | 'right' } {
  const sectionMap: { [seatColumn: string]: 'left' | 'middle' | 'right' } = {};
  const groups: string[][] = [];

  let currentGroup: string[] = [];

  for (const seat of seatOrder) {
    if (seat === 'WW') {
      if (currentGroup.length) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    } else {
      currentGroup.push(seat);
    }
  }
  if (currentGroup.length) {
    groups.push(currentGroup);
  }


groups.forEach((group, index) => {
  let section: 'left' | 'middle' | 'right';

  if (groups.length === 3) {
    section = index === 0 ? 'left' : index === 1 ? 'middle' : 'right';
  } else if (groups.length === 2) {
    section = index === 0 ? 'left' : 'right';
  } else {
    // fallback or custom logic if needed for 1 or more than 3
    section = 'left';
  }

  group.forEach(seat => {
    sectionMap[seat] = section;
  });
});

return sectionMap;
}
getSeatsInRow(section: 'left' | 'middle' | 'right', row: number): Seat[] {
  return this.seats.filter(seat => seat.row === row && seat.position === section);
}
get hasMiddleSeats(): boolean {
  return this.seats.some(s => s.position === 'middle');
}

  // Helper to convert seat column letter to a number for sorting/positioning
  private getColumnNumber(seatColumn: string, seatOrder: string[]): number {
    return seatOrder.indexOf(seatColumn) + 1;
  }

  currentScrollContainer: ElementRef | undefined;
    @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    // Set the current scroll container after the view has initialized
    // This is important because QueryList is populated AFTER view init
    this.updateCurrentScrollContainer();

    // Subscribe to changes in scrollContainers (e.g., when tabs change)
    this.scrollContainers.changes.subscribe(() => {
      this.updateCurrentScrollContainer();
    });
  }

  // Helper to set the correct scroll container based on activeSegment
  updateCurrentScrollContainer(): void {
    if (this.activeSegment && this.scrollContainers) {
      // Find the index of the active segment
      const activeIndex = this.segmentSeatMaps.findIndex(s => s === this.activeSegment);
      if (activeIndex !== -1 && this.scrollContainers.length > activeIndex) {
        this.currentScrollContainer = this.scrollContainers.get(activeIndex);
        // After setting the container, ensure rangeValue reflects the current scroll position
        if (this.currentScrollContainer) {
            this.onScroll(); // Call onScroll to update rangeValue for the new tab
        }
      } else {
        this.currentScrollContainer = undefined;
      }
    } else {
        this.currentScrollContainer = undefined;
    }
  }

  setActiveSegment(segment: any): void {
    this.activeSegment = segment;
    this.generateSeatsForActiveSegment(); // Regenerate seats for the new segment
    this.updateCurrentScrollContainer(); // Update the scroll container when segment changes
    // Also ensure the range slider resets or syncs when a new tab is selected
    // It's often good to reset scroll to 0 when a new tab is opened, or sync its current position.
    if (this.currentScrollContainer) {
        this.currentScrollContainer.nativeElement.scrollLeft = 0;
        this.rangeValue = 0;
    }
  }

   onRangeInput(event: Event): void {
    if (!this.currentScrollContainer) return; // Guard against no container

    const input = event.target as HTMLInputElement;
    this.rangeValue = +input.value;

    const container = this.currentScrollContainer.nativeElement;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const percentage = this.rangeValue / 100;
    container.scrollLeft = maxScroll * percentage;
  }

  onScroll(): void {
    if (!this.currentScrollContainer) return; // Guard against no container

    const container = this.currentScrollContainer.nativeElement;
    const maxScroll = container.scrollWidth - container.clientWidth;
    // Avoid division by zero if there's no scrollable content
    if (maxScroll === 0) {
      this.rangeValue = 0;
      return;
    }
    const percentage = (container.scrollLeft / maxScroll) * 100;
    this.rangeValue = percentage;
  }

  getRows(position: 'left' | 'right'|'middle'): number[] {
    const rows = new Set<number>();
    this.seats
      .filter((s) => s.position === position)
      .forEach((s) => rows.add(s.row));
    return Array.from(rows).sort((a, b) => a - b);
  }


  getSelectedSeats(): Seat[] {
    return this.seats.filter((seat) => seat.status === 'selected');
  }



  continueToSeats() {
    this._router.navigate(['/payment'],{
      queryParams:{
        id:this.itnearyId
      }
    });
  }
}