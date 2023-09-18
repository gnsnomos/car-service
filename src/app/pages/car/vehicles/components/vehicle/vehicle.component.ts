import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vehicle} from "@app/pages/car/vehicles/store/list";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent {
  @Input() item!: Vehicle;

  @Output() edit = new EventEmitter<Vehicle>();
  @Output() delete = new EventEmitter<string>();

  onEdit(vehicle: Vehicle): void {
    this.edit.emit(vehicle);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
