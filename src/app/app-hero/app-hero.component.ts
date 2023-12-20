import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-hero.component.html',
  styleUrl: './app-hero.component.css',
})
export class AppHeroComponent implements OnInit {
  @ViewChild('slider') sliderx: ElementRef | undefined;
  @ViewChildren('.indicators div') indicators:
    | QueryList<ElementRef>
    | undefined;
  images = [
    { src: 'assets/Image/Hero image (1).jpg', alt: 'Image 1' },
    { src: 'assets/Image/Hero image (2).jpg', alt: 'Image 2' },
    { src: 'assets/Image/Hero image (3).jpg', alt: 'Image 3' },
    { src: 'assets/Image/Hero image (4).jpg', alt: 'Image 4' },
    { src: 'assets/Image/Hero image (5).jpg', alt: 'Image 5' },
    { src: 'assets/Image/Hero image (6).jpg', alt: 'Image 6' },
  ];

  counter = 0;
  isDragging = false;
  dragStartX: number = 0;
  dragEndX: number = 0;
  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      const timer$ = interval(6000);
      timer$.pipe(take(10)).subscribe(() => {
        this.nextSlide();
        this.cdr.detectChanges();
      });
    });
  }

  nextSlide() {
    this.counter++;
    if (this.counter === this.images.length) {
      this.counter = 0;
    }
  }

  prevSlide() {
    this.counter--;
    if (this.counter < 0) {
      this.counter = this.images.length - 1;
    }
  }

  goToSlide(index: number) {
    this.counter = index;

    if (this.indicators && this.indicators.length > index) {
      const indicatorElement = this.indicators.toArray()[index]
        .nativeElement as HTMLElement;
      indicatorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.dragStartX = event.clientX;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.isDragging) {
      this.dragEndX = event.clientX;
      this.handleDrag();
      this.isDragging = false;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.dragEndX = event.clientX;
      this.handleDrag();
    }
  }

  private handleDrag() {
    const dragDistance = this.dragEndX - this.dragStartX;
    const slideWidth = 100 / this.images.length;
    const dragPercentage = (dragDistance / window.innerWidth) * 100;

    if (dragPercentage > 10) {
      this.prevSlide();
    } else if (dragPercentage < -10) {
      this.nextSlide();
    }
    // Reset drag start position
    this.dragStartX = this.dragEndX;
  }
}
