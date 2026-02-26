import {Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true
})
export class InViewDirective implements OnInit, OnDestroy {
  @Input() threshold = 0.18;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.zone.run(() => this.isVisibleChange.emit(true));
            this.observer.disconnect();
          }
        },
        {threshold: this.threshold}
      );

      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
