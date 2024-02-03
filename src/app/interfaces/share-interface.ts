  export interface ItineraryList {
    itineraryListId:number;
    itineraryGroupName:string;
    itinerary:Itinerary[];
  }
  export interface Itinerary {
    itineraryId: number;
    itineraryRef: number;
    imgSrc: string;
    title: string;
    location: string;
    callToAction: string;
    duration: string;
    travelDate: string;
    tourName: string;
    tourDescription: string;
    rating: string;
    tourPackageAmount: string;
    tourPackageDiscount: string;
    tourTradingAmount: string;
  }

  export interface ItineraryListSimpleDTO {
    itineraryListId: number;
    itineraryGroupName: string;
  }
  
  