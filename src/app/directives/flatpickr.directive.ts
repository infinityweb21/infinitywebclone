import {
  Directive,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
  input,
} from '@angular/core';
import flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';

@Directive({
  selector: '[appFlatpickr]',
})
export class FlatpickrDirective implements OnDestroy, AfterViewInit, OnChanges {
  readonly mode = input<'single' | 'range' | 'basic'>('single', {
    alias: 'appFlatpickr',
  });
  @Output() dateSelected = new EventEmitter<{
    departure: string;
    arrival?: string;
  }>();

  private flatpickrInstance!: Instance;
  private resizeListener!: () => void;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    this.initFlatpickr();
    this.resizeListener = () => this.reinitFlatpickr();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode'] && !changes['mode'].firstChange) {
      this.reinitFlatpickr();
    }
  }

  private initFlatpickr(): void {
    const showMonths = window.innerWidth < 768 ? 1 : 2;

    // BASIC mode — mimics the original script behavior
    if (this.mode() === 'basic') {
      this.flatpickrInstance = flatpickr(this.el.nativeElement, {
        enableTime: false,
        mode: 'single',
        dateFormat: 'Y-m-d',

        disableMobile: true,
        onChange: (selectedDates, dateStr, instance) => {
          const [date] = selectedDates;
          if (date) {
            const formatted = instance.formatDate(date, 'Y-m-d');
            this.dateSelected.emit({ departure: formatted });
          } else {
            this.dateSelected.emit({ departure: '' });
          }
        },
      });
      return;
    }

    // SINGLE or RANGE mode — with enhanced behavior
    this.flatpickrInstance = flatpickr(this.el.nativeElement, {
      mode: this.mode() === 'single' ? 'single' : 'range',
      showMonths,
      dateFormat: 'Y-m-d',
      clickOpens: false,
      disableMobile: true,
onChange: (selectedDates, dateStr, instance) => {
  const [start, end] = selectedDates;

  // Force flatpickr input value to just the start date
  if (start) {
    const formattedStart = instance.formatDate(start, 'Y-m-d');
    this.el.nativeElement.value = formattedStart;

    // If in range mode and only start is selected, disable dates before start
    if (this.mode() === 'range' && !end) {
      instance.set('minDate', start);
    }
  } else {
    this.el.nativeElement.value = '';
  }

  // Emit dates
  this.dateSelected.emit({
    departure: start ? instance.formatDate(start, 'Y-m-d') : '',
    arrival: end ? instance.formatDate(end, 'Y-m-d') : '',
  });
},

      // onChange: (selectedDates, dateStr, instance) => {
      //   const [start, end] = selectedDates;

      //   // Force flatpickr input value to just the start date, even in 'range' mode
      //   if (start) {
      //     const formattedStart = instance.formatDate(start, 'Y-m-d');
      //     this.el.nativeElement.value = formattedStart;
      //   } else {
      //     this.el.nativeElement.value = '';
      //   }

      //   // Emit dates to component
      //   this.dateSelected.emit({
      //     departure: start ? instance.formatDate(start, 'Y-m-d') : '',
      //     arrival: end ? instance.formatDate(end, 'Y-m-d') : '',
      //   });
      // },

      onOpen: (selectedDates, dateStr, instance) => {
        const container = instance.calendarContainer;
        container.classList.add('custom-calender-container');
        if (!container.querySelector('.custom-calender-close-btn')) {
          const closeBtn = document.createElement('button');
          closeBtn.type = 'button';
          closeBtn.textContent = 'Close';
          closeBtn.className = 'custom-calender-close-btn';
          closeBtn.addEventListener('click', () => instance.close());
          container.appendChild(closeBtn);
        }
      },
    });

    this.el.nativeElement.addEventListener('click', (e) => {
      e.preventDefault();
      this.flatpickrInstance.open();
    });
  }
  private reinitFlatpickr(): void {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
    this.initFlatpickr();
  }

  ngOnDestroy(): void {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
    window.removeEventListener('resize', this.resizeListener);
  }
}
