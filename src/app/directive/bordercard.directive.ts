import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBordercard]',
})
export class BordercardDirective {

  private initialColor:string = '#f5f5f5'
  private defaultColor:string = '#009688'
  private defaultHeight:number = 180

  constructor(private el: ElementRef) {
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  }

  // Declare a property named "borderColor" , you will assign it in mouseenter //
  @Input('appBordercard') borderColor: string

  // Use HostListener ( detect events) to set a event on hover //
  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  private setBorder(color: string) {
    let border = 'solid 4px' + color;
    this.el.nativeElement.style.border = border;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }
}
