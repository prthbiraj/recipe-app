import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAdvHighlight]'
})
export class AdvHighlightDirective implements OnInit{

  constructor(private elementRef: ElementRef, private rander: Renderer2) { }
  
  
  ngOnInit(): void {
    
  }

  @HostListener('mouseenter') mouseEnter(event:Event) {
    this.rander.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'blue');
    this.rander.setStyle(this.elementRef.nativeElement, 'color', 'white');
  }

  @HostListener('mouseleave') mouseLeave(event:Event) {
    this.rander.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'transparent');
    this.rander.setStyle(this.elementRef.nativeElement, 'color', 'black');
  }

}
