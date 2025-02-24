export interface HomeContent {
  seo: {
    title: string;
  };
  hero: {
    title: {
      colored: string;
      regular: string;
    };
    subtitle: string;
  };
  mainPath: {
    title: string;
    description: string;
    features: {
      id: number;
      title: string;
      description: string;
    }[];
  };
  advantages: {
    title: string;
    items: {
      id: number;
      title: string;
      description: string;
    }[];
  };
  contacts: {
    phone: string;
    email: string;
    workHours: {
      days: string;
      time: string;
    };
    address: string;
    formText: {
      line1: string;
      line2: string;
      line3: string;
    };
  };
} 