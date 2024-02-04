import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ItineraryListSimpleDTO } from '../../../interfaces/share-interface';
import { ApiService } from '../../../api-service/api-service.service';
import { CustomValidationService } from '../../../app-validator/custom-validation-service';
import { CustomValidation } from '../../../app-validator/custom-validation';


@Component({
  selector: 'app-itinerary-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './itinerary-create.component.html',
  styleUrl: './itinerary-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItineraryCreateComponent {
  itineraryGroupForm!: FormGroup; //only for validation purpose
  itineraryForm!: FormGroup;
  itineraryGroupList$: Observable<ItineraryListSimpleDTO[]> = new Observable<
    ItineraryListSimpleDTO[]
  >();
  itineraryGroupRefId: number = 0;
  isHidden: boolean = true;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItineraryCreateComponent>,
    private dialog: MatDialog,
    private validationService: CustomValidationService,
    private cdr: ChangeDetectorRef
  ) {}
  getItineraryGroupList() {
    this.itineraryGroupList$ = this.apiService.getAllItineraryListsInGroup();
  }
  findItineraryRefId(byName: any) {
    if (byName && byName.target && byName.target.value !== 'default') {
      this.itineraryGroupList$.subscribe({
        next: (value) => {
          value.forEach((element) => {
            if (element.itineraryGroupName === byName.target.value) {
              this.itineraryGroupRefId = element.itineraryListId;
              // console.log(element.itineraryListId);
              // Assuming you want to set element.igroupListId as the value of itineraryRef
              this.itineraryForm
                .get('itineraryRef')
                ?.setValue(element.itineraryListId);
            } else {
              this.itineraryGroupRefId = 0;
            }
          });
        },
      });
    }
  }
  ngOnInit(): void {
    this.itineraryGroupForm = this.fb.group({
      itineraryGroupSelection: new FormControl('', [
        Validators.required,
        CustomValidation.customSelect(),
      ]),
      fileSelect: new FormControl('', [Validators.required]),
    });

    this.itineraryForm = this.fb.group({
      itineraryId: new FormControl(0),
      itineraryRef: new FormControl(this.itineraryGroupRefId, [
        Validators.required,
        CustomValidation.customNumberMin1,
      ]),
      imgSrc: new FormControl("", [
        Validators.required,
        CustomValidation.customText2(),
      ]),
      title: new FormControl('', [
        Validators.required,
        CustomValidation.customText1(),
      ]),
      location: new FormControl(null),
      callToAction: new FormControl(null),
      duration: new FormControl(null),
      travelDate: new FormControl(null),
      tourName: new FormControl('', [
        Validators.required,
        CustomValidation.customText1(),
      ]),
      tourDescription: new FormControl('', [
        Validators.required,
        CustomValidation.customText3(),
      ]),
      rating: new FormControl(null),
      tourPackageAmount: new FormControl(null),
      tourPackageDiscount: new FormControl(null),
      tourTradingAmount: new FormControl(null),
    });
    this.getItineraryGroupList();
  }
  dialogClose() {
    this.dialogRef.close();
  }
  // Validation
  getErrorMessageText1(controlName: string): string | null {
    const control = this.itineraryForm.get(controlName);
    return control
      ? this.validationService.getErrorMessageText1(control, '*', '*', '*')
      : null;
  }
  getErrorMessageText3(controlName: string): string | null {
    const control = this.itineraryForm.get(controlName);
    return control
      ? this.validationService.getErrorMessageText3(control, 'Maximum of approximately 140 words or 850 characters is allowed.')
      : null;
  }

  getErrorMessageSelect(controlName: string): string | null {
    const control = this.itineraryGroupForm.get(controlName);
    return control
      ? this.validationService.getErrorMessageSelect(control, '*')
      : null;
  }

  formSubmit() {
    if (this.itineraryForm.valid && this.itineraryGroupForm.valid) {
      this.apiService
        .createItinerary(this.itineraryForm!.value, this.file!)
        .subscribe({
          next: (r: any) => {
            if (r && r.message) {
              console.log(r.message); 
              alert('The itinerary was saved successfully!');
              this.dialogRef.close();
            } else {
              console.error('Invalid response received from server');
            }
          },
          error: (e) => {
            if (e instanceof HttpErrorResponse) {
              alert(`${e.error.error}`);
            }
            console.error(e.error.error);
          },
          complete: () => {
           this.dialogRef.close();
          },
        });
    }
  }

  file: File | undefined;
  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    this.itineraryForm.get('imgSrc')!.setValue( this.file!.name);
    if (this.file!.size > 5 * 1024 * 1024) {
      // Check file size (1MB limit)
      this.itineraryGroupForm.get('fileSelect')?.setErrors({
        fileSize: true,
      });
      return;
    }

    // Check file type (example: allow only images)
    if (!this.file!.type.startsWith('image/')) {
      this.itineraryGroupForm.get('fileSelect')?.setErrors({
        fileType: true,
      });
      return;
    }

    this.cdr.detectChanges();
  }
  getErrorMessageFile(controlName: string) {
    const control = this.itineraryGroupForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return '*';
      } else if (control.errors['fileSize']) {
        return 'File size exceeds 1MB.';
      } else if (control.errors['fileType']) {
        return 'Only image files are allowed(.jpeg/jpg).';
      } else {
        return 'Invalid file.'; // Generic error message
      }
    }
    return '';
  }
  
}
