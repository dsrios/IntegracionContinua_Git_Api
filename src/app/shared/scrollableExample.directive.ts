import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[scrollable]',
  exportAs: 'scrollable'
})
export class ScrollableDirectiveExample {
  @Input() scrollUnit = 0;

  constructor(private elementRef: ElementRef) { }

  private get element() {
    return this.elementRef.nativeElement;
  }

  get isOverflow() {
    return this.element.scrollWidth > this.element.clientWidth;
  }

  scrollMove(direction: number) {
    const moveUnits: number = Number(this.scrollUnit) * direction;
    const left: number = this.element.scrollLeft;

    this.element.scrollLeft = left + moveUnits;
  }

  get isScrollStart() {
    return this.element.scrollLeft === 0;
  }

  get isScrollEnd() {
    return Number(this.element.scrollLeft) + Number(this.element.clientWidth) === this.element.scrollWidth;
  }

  // for update view when windows resized
  @HostListener('window:resize')
  onWindowResize(): void {}

  // for update view with scroll action
  @HostListener('scroll', ['$event'])
  onScrollAction(): void {}
}

/*How to use
    <div scrollable 
        #scrollableVariable="scrollable" 
        [scrollUnit]="900" >
        <button 
            class="left"
            *ngIf="scrollableVariable.isOverflow"
            [class.disabled]="scrollableVariable.isScrollStart"
            [disabled]="scrollableVariable.isScrollStart"            
            (onClick)="scrollableVariable.scrollMove(-1)" 
            >
        </button>        
        <div class="container">
            <ng-container>
                DATA TO RENDER
            </ng-container>
        </div>
        <button *ngIf="scrollableVariable.isOverflow" class="right"
            [class.disabled]="scrollableVariable.isScrollEnd"
            [disabled]="scrollableVariable.isScrollEnd"              
            (onClick)="scrollableVariable.scrollMove(1)">
        </button>   
    </div>
*/
