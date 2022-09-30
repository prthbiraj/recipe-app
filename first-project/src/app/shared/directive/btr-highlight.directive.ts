import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBtrHighlight]'
})
export class BtrHighlightDirective implements OnInit{

  @Input() defaultColor:string;
  @Input() selectedColor:string;

  @HostBinding('style.backgroundColor') bgColor;
  @HostBinding('style.color') color = 'black'

  constructor() { }

  ngOnInit(): void {
    this.bgColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseEnter(event:Event) {
    this.bgColor = this.selectedColor;
    this.color = 'white'
  }

  @HostListener('mouseleave') mouseLeave(event:Event) {
    this.bgColor = this.defaultColor;
    this.color = 'black';
  }
}
