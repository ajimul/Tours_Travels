import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit(): void {
    
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog with false value (cancel)
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Close dialog with true value (confirm)
  }
}