export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterApiAddress {
  city: string;
  country: string;
  postal_code: string;
  house_number: string;
  street: string;
  state: string;
}

export interface RegisterApiData {
  first_name: string;
  last_name: string;
  dob: string;
  address: RegisterApiAddress;
  phone_number: string;
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
  password: string;
}
