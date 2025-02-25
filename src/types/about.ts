export interface AboutContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
  };
  whoWeAre: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  values: {
    title: string;
    items: ValueItem[];
  };
  advantages: {
    title: string;
    items: AdvantageItem[];
  };
  partnership: {
    text: string;
  };
  legalInfo: {
    title: string;
    officialName: LabeledValue;
    legalAddress: LabeledValue;
    inn: LabeledValue;
    ogrn: LabeledValue;
    director: LabeledValue;
    contacts: {
      label: string;
      phone: string;
      email: string;
    };
  };
}

export interface ValueItem {
  id: number;
  title: string;
  description: string;
}

export interface AdvantageItem {
  id: number;
  title: string;
  description: string;
}

export interface LabeledValue {
  label: string;
  value: string;
} 