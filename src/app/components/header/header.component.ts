import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {User} from '@app/store/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input() user!: User | null;
  @Input() title!: string;
  @Input() isAuthorized!: boolean | null;

  @Output() signOut = new EventEmitter<void>();

  constructor(private router: Router) { }

  onSignOut(): void {
    this.signOut.emit();
  }

  async onProfileNavigate(): Promise<void> {
    const path = this.user ? this.user.uid : 'new';
    await this.router.navigate(['/profile', path]);
  }

}
