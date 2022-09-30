import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message:string;
  @Output() errorEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    console.log("close click..")
    this.errorEvent.emit();
  }

}
