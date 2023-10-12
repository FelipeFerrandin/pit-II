interface CustomerAddressUpdateDTO {
  id_customer_address: number;
  public_place: string;
  district: string;
  number: number;
  city: string;
  state: string;
  country: string;
}

interface CustomerAddressCreateDTO {
  id_customer: number;
  public_place: string;
  district: string;
  number: number;
  city: string;
  state: string;
  country: string;
}

export {
  CustomerAddressCreateDTO,
  CustomerAddressUpdateDTO,
};