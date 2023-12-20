import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { CategoryDetails, ProductDTO } from '../interfaces/share-interface';
import { AppHeroComponent } from "../app-hero/app-hero.component";


@Component({
    selector: 'app-app-pages-default',
    standalone: true,
    templateUrl: './app-pages-default.component.html',
    styleUrl: './app-pages-default.component.css',
    imports: [AppHeroComponent]
})
export class AppPagesDefaultComponent {
  // @Output() addCardClicked: EventEmitter<CategoryDetails> = new EventEmitter<CategoryDetails>();
  // requestCard?: ProductDTO;
  // categoryDetails: CategoryDetails[] = [];
  // constructor(private cd: ChangeDetectorRef) {

  // }


  onCardClicked(CardList: CategoryDetails) {
  }
  // onCategoryClicked(productDTO: ProductDTO) {
    
  //   this.requestCard = {
  //     productId: 0,
  //     productName: '',
  //     productDesc: '',
  //     productImgSrc: ''
  //   };
  //   this.requestCard =productDTO;
 
  // }
  // addToMyCard(CardList: CategoryDetails) {
  //      this.addCardClicked.emit(CardList);
  // }
  ngOnInit() {
  }
  
}
