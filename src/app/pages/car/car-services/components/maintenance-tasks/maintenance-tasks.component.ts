import {Component, Input, OnInit} from '@angular/core';
import {MaintenanceType, Service} from "@app/models/backend/vehicle";

@Component({
  selector: 'app-maintenance-tasks',
  templateUrl: './maintenance-tasks.component.html',
  styleUrls: ['./maintenance-tasks.component.scss']
})
export class MaintenanceTasksComponent implements OnInit {
  @Input() service: Service;

  tasks: { label: string, items: string[] }[];

  ngOnInit(): void {
    this.tasks = [
      {label: $localize`Liquids`, items: this.getSelectedValues(this.service.sintirisiIgra)},
      {label: $localize`Electric`, items: this.getSelectedValues(this.service.sintirisiIlektrologika)},
      {label: $localize`Machine`, items: this.getSelectedValues(this.service.sintirisiMixanikaMeri)},
      {label: $localize`Suspension`, items: this.getSelectedValues(this.service.sintirisiAnartisi)},
      {label: $localize`Other`, items: this.getSelectedValues(this.service.sintirisiLoipa)}
    ];
  }

  private getSelectedValues(maintenanceItems: MaintenanceType[]): string[] {
    return maintenanceItems.filter((maintenanceItem: MaintenanceType | string) => typeof maintenanceItem === 'string')
      .map(selectedItem => this.mapSelectedItemToLabel(maintenanceItems, selectedItem));
  }

  private mapSelectedItemToLabel(maintenanceItems: MaintenanceType[], selectedItem: MaintenanceType): string {
    return (maintenanceItems
      .filter((item: MaintenanceType) => typeof item === 'object' && item.value === selectedItem.toString())[0] as MaintenanceType)
      .label;
  }
}
