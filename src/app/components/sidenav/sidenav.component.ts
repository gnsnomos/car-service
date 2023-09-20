import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() title: string;
  @Input() isAuthorized: boolean | null;

  @Output() signOut = new EventEmitter<void>();
  @Output() profileNavigate = new EventEmitter<void>();

  onSignOut(): void {
    this.signOut.emit();
  }

  async onProfileNavigate(): Promise<void> {
    this.profileNavigate.emit();
  }
}
