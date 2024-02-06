import { CommonModule } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ItineraryCreateComponent } from '../itinerary-create/itinerary-create.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ItineraryGroupComponent } from '../itinerary-group/itinerary-group.component';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Itinerary, ItineraryListSimpleDTO } from '../../../interfaces/share-interface';
import { ApiService } from '../../../api-service/api-service.service';
@Component({
  selector: 'app-itinerary-view',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './itinerary-view.component.html',
  styleUrl: './itinerary-view.component.css',
})
export class ItineraryViewComponent {
  itinerary: Itinerary[] = [];
  itineraryByName: string = '';
  apiServerUrl = environment.apiBaseUrl;
  constructor(private dialog: MatDialog, private apiService: ApiService) {}
  itineraryDataSource = new MatTableDataSource<Itinerary>(this.itinerary);
  clickedRowsItinerary = new Set<Itinerary>();
  itineraryTableColumns = [
    'imgSrc',
    'title',
    'location',
    'tourName',
    'deleteAction',
  ];
  itineraryGroupList$: Observable<ItineraryListSimpleDTO[]> = new Observable<
    ItineraryListSimpleDTO[]
  >();
  getItineraryGroupList() {
    this.itineraryGroupList$ = this.apiService.getAllItineraryListsInGroup();
  }
  getItinerary(event: any): void {
    const selectedValue: string = event?.target?.value || '';
    if (event?.target?.value === 'default') {
    } else if (event?.target?.value === 'add-group') {
      this.openDialogCreateItineraryGroup();
    } else {
      this.itineraryByName = selectedValue;
      this.getItinerariesByName(selectedValue);
    }
  }
  getItinerariesByName(byName: string) {
    this.itinerary = [];
    this.itineraryDataSource = new MatTableDataSource<Itinerary>(
      this.itinerary
    );
    this.apiService.getItineraryListByName(byName).subscribe({
      next: (value) => {
        this.itinerary = value;
      },
      error: (e) =>{
        if (e instanceof HttpErrorResponse) {
        console.error(e.error)
        }
      } ,

      complete: () => {
        this.itineraryDataSource = new MatTableDataSource<Itinerary>(
          this.itinerary
        );
      },
    });
  }

  openDialogDeleteItinerary(id: any,img:any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // alert(element)
        this.apiService.deleteItinerary(id,img).subscribe({
          next: (r: any) => {
            if (r && r.message) {
              console.log(r.message); 
              alert(r.message);
            } else {
              console.error('Invalid response received from server');
            }
          },
          error: (e) => {
            if (e instanceof HttpErrorResponse) {
              alert(`${e.error.error}`);
            }
            console.error(e);
          },
          complete: () => {
            this.getItinerariesByName(this.itineraryByName);
          },
        });
      } else {
        // User canceled deletion
        console.log('File deletion canceled');
      }
    });
  }
  openDialogCreateItineraryGroup() {
    const dialogRef = this.dialog.open(ItineraryGroupComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getItineraryGroupList();
    });
  }

  openDialogCreateItinerary() {
    const dialogRef = this.dialog.open(ItineraryCreateComponent, {
      width: '100%',
      height: '95%',
      // data: { element },
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getItinerariesByName(this.itineraryByName);
    });
  }
  deleteItinerary(element: any) {}

  ngOnInit(): void {
    this.getItineraryGroupList();
  }
}
