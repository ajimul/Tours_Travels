import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api-service/api-service.service';
import { CustomValidationService } from '../../../app-validator/custom-validation-service';
import { CustomValidation } from '../../../app-validator/custom-validation';

@Component({
  selector: 'app-itinerary-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './itinerary-group.component.html',
  styleUrl: './itinerary-group.component.css'
})
export class ItineraryGroupComponent implements OnInit {
  createGroup!: FormGroup;
  constructor(public dialogRef: MatDialogRef<ItineraryGroupComponent>,
    private apiService: ApiService,
    private fb: FormBuilder,
    private validationService: CustomValidationService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createGroup = this.fb.group({
      itineraryGroupName: new FormControl('', [
        Validators.required,
        CustomValidation.customName(),
      ]),
    });
  }
  // validation
  getErrorMessageText1(controlName: string): string | null {
    const control = this.createGroup.get(controlName);
    return control
      ? this.validationService.getErrorMessageName(control, '*', '*', '*','*', '*')
      : null;
  }
  formSubmit(){
    if(this.createGroup.valid){
      this.apiService.createItineraryGroup(this.createGroup.value).subscribe({
        next: (r) => {
         
        },
        error: (e) => {
                   console.log(e);
        },
        complete: () => {
          alert('Group Create Successful!');
          this.dialogRef.close();
        },
      });
    }

  }

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog with false value (cancel)
  }
}