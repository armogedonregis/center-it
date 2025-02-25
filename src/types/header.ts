export interface MenuItem {
  id: number;
  title: string;
  url: string;
  isActive: boolean;
}

export interface HeaderContent {
  logo: {
    text: {
      colored: string;
      regular: string;
    };
    alt: string;
  };
  menu: MenuItem[];
  contactButton: {
    text: string;
  };
} 