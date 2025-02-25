export interface ContactsContent {
  seo: {
    title: string;
    description: string;
  };
  form: {
    title: string;
    description: string;
    phoneNumber: string;
    email: string;
    timeWork: string;
  };
  office: {
    title: string;
    companyName: {
      colored: string;
      regular: string;
    };
    address: {
      label: string;
      value: string;
    };
  };
  requisites: {
    title: string;
    officialName: {
      label: string;
      value: string;
    };
    director: {
      label: string;
      value: string;
    };
    inn: {
      label: string;
      value: string;
    };
    ogrn: {
      label: string;
      value: string;
    };
  };
  callback: {
    text: string;
    buttonText: string;
  };
  map: {
    url: string;
  };
} 