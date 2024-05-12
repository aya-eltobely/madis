import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScaleOut]',
  standalone: true
})
export class ScaleOutDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.scale(1.06);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.scale(1);
  }

  private scale(scaleFactor: number) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', `scale(${scaleFactor})`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'transform 0.5s ease-in-out');
  }
}
