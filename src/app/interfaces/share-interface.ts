export interface ProductDTO {
    productId: number;
    productName: string;
    productImgSrc: string;
    productDesc: string;
  }
export interface CategoryDetails {
    cDetailsId?: number;
    productRef?: number;
    categoryName?: string;
    stockQuantity?: number;
    categoryImgSrc?: string;
    productDetailsName?: string;
    productDate?: string; // Assuming you're using a string for simplicity, consider using Date if needed
    description?: string;
    ratingScore?: number;
    mRP?: number;
    price?: number;
    discount?: number;
    gST?: number;
    teaForm?: string;
    specification?: string;
    flavour?: string;
    teaType?: string;
    packageType?: string;
    shelfLife?: string;
    netQuantity?: string;
    addedExtracts?: string;
    grades?: string;
    productClass?: string;
    region?: string;
    characteristics?: string;
    liquor?: string;
    useFor?: string;
    inLoose?: string;
    loosePrice?: number;
    transportCharge?: number;
    looseMOQ?: string;
    ingredients?: string;
    categoryDetailsImgSrc?: CategoryDetailsImgSrc[];
  }
  export interface CategoryDetailsImgSrc {
    cDetailsImgSrcId?: number;
    cDetailsRef?: number;
    cDetailsImgSrc?: string;
  }
  
  export interface MyCard {
    mycardId: number;
    clientRefId: number;
    categoryDetailsId: number;
  }
  export interface MyCardDTO {
    categoryDetailsId: number;
  }

  export interface Client {
    clientId: number;
    name: string;
    passkey: string;
    email: string;
    contact: string;
    registrationDate: string; 
    address: string;
    isActive: boolean;
    myCard: MyCard[];
  }