export interface User {
  address: {
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
    state: string;
    street_address: string;
    street_name: string;
    zip_code: string;
  };
  avatar: string;
  credit_card: {cc_number: string};
  date_of_birth: string;
  email: string;
  employment: {key_skill: string; title: string};
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
  password: string;
  phone_number: string;
  social_insurance_number: string;
  subscription: {
    payment_method: string;
    plan: string;
    status: string;
    term: string;
  };
  uid: string;
  username: string;
}
