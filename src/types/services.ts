export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  list: string[];
}

export interface ServicesContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  services: ServiceItem[];
  footer: {
    text: string;
  };
} 