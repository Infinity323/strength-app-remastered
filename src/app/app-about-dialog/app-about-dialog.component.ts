import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-about-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './app-about-dialog.component.html',
  styleUrl: './app-about-dialog.component.scss',
})
export class AppAboutDialogComponent {
  constructor(public dialogRef: MatDialogRef<AppAboutDialogComponent>) {}
}
