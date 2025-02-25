export interface HomeContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    subtitle: string;
  };
  features: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  advantages: {
    title: string;
    items: {
      title: string;
      subtitle: string;
      icon: string;
    }[];
  };
  contacts: {
    title: string;
    phone: string;
    email: string;
    workHours: {
      days: string;
      hours: string;
    };
    address: string;
    form: {
      description: string[];
      buttonText: string;
    };
    map: {
      url: string;
    };
  };
} 