import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from "@app/pages/car/car-services/store/list";
import {ControlItem} from "@app/models/frontend";

@Component({
  selector: 'app-car-service',
  templateUrl: './car-service.component.html',
  styleUrls: ['./car-service.component.scss']
})
export class CarServiceComponent {
  @Input() item: Service;
  @Input() vehicles!: ControlItem[];
  @Input() collapsedHeight: string;
  @Input() expandedHeight: string;

  @Output() edit = new EventEmitter<Service>();
  @Output() delete = new EventEmitter<string>();

  panelOpenState = false;

  onEdit(vehicle: Service): void {
    this.edit.emit(vehicle);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
