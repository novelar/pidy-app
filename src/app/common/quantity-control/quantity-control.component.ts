import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quantity-control',
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.scss']
})
export class QuantityControlComponent implements OnInit {
  @Input() quantity: number;
  @Output() onChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit() { }
  plusOne = () => {
    if (this.quantity < 100) {
      this.quantity++;
      this.onChange.emit(this.quantity);
    }
  }

  minusOne = () => {
    if (this.quantity > 1) {
      this.quantity--;
      this.onChange.emit(this.quantity);
    }
  }
}
