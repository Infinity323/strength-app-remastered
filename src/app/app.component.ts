import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MatDialog } from '@angular/material/dialog';
import { AppAboutDialogComponent } from './app-about-dialog/app-about-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MyDashboardComponent,
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'strength-app-remastered';

  constructor(public aboutDialog: MatDialog) {}

  openAboutDialog() {
    this.aboutDialog.open(AppAboutDialogComponent, {
      width: '500px',
    });
  }
}
