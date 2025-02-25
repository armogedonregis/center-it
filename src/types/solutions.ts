export interface FunctionalityItem {
  title: string;
  description: string;
}

export interface SolutionItem {
  id: number;
  title: string;
  description: string;
  image: string;
  functionality: string;
  functionality_array: FunctionalityItem[];
  advantages: string;
  advantages_array: string[];
}

export interface FormInfo {
  title: string;
  description: string;
  phoneNumber: string;
  email: string;
  timeWork: string;
}

export interface SolutionsContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  solutions: SolutionItem[];
  form: FormInfo;
} 