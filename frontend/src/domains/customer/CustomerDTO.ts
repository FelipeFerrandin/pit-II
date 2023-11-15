class CustomerDTO {
  id_customer: number = 0;
  name: string = "";
  last_name: string = "";
  complete_name: string = "";
  email: string = "";
  birth_date: string = "";
  phone_number: string = "";
}


class CustomerUpdateDTO {
  id_customer: number = 0;
  name: string = "";
  last_name: string = "";
  birth_date: string = "";
  phone_number: string = "";
}

class CustomerUpdatePasswordDTO {
  old_password: string = "";
  new_password: string = "";
}

class CustomerAddressDTO {
  id_customer_address: number = 0;
  id_customer: number = 0;
  public_place: string = "";
  district: string = "";
  number: number = 0;
  city: string = "";
  state: string = "";
  country: string = "";
}

class CustomerAddressUpdateDTO {
  id_customer_address: number = 0;
  public_place: string = "";
  district: string = "";
  number: number = 0;
  city: string = "";
  state: string = "";
  country: string = "";
}


class CustomerCreateCompleteDTO {
  customer = new CustomerCreateDTO();
  address = new CustomerAddressCreateDTO();
}

class CustomerCreateDTO {
  name: string = "";
  last_name: string = "";
  email: string = "";
  password: string = "";
  birth_date: string = "";
  phone_number: string = "";
}

class CustomerAddressCreateDTO {
  public_place: string = "";
  district: string = "";
  number: number = 0;
  city: string = "";
  state: string = "";
  country: string = "";
}

export {
  CustomerCreateCompleteDTO,
  CustomerAddressUpdateDTO,
  CustomerAddressDTO,
  CustomerUpdatePasswordDTO,
  CustomerUpdateDTO,
  CustomerDTO
};