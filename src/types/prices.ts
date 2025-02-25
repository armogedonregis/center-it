export interface PriceFactorItem {
  id: number;
  title: string;
  description: string;
  postDescription: string;
  tarif?: boolean;
}

export interface FormInfo {
  title: string;
  description: string;
  phoneNumber: string;
  email: string;
  timeWork: string;
}

export interface PricesContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  factors: {
    title: string;
    description: string;
    items: PriceFactorItem[];
  };
  form: FormInfo;
} 