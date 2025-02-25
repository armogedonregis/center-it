export interface FooterLink {
  id: number;
  title: string;
  url: string;
}

export interface FooterContent {
  logo: {
    text: {
      colored: string;
      regular: string;
    };
    alt: string;
  };
  company: {
    title: string;
    description: string;
  };
  links: {
    title: string;
    items: FooterLink[];
  };
  contacts: {
    title: string;
    address: string;
    phone: string;
    email: string;
    socialTitle: string;
    socials: {
      id: number;
      name: string;
      icon: string;
      url: string;
    }[];
  };
  copyright: {
    text: string;
    year: number;
  };
} 