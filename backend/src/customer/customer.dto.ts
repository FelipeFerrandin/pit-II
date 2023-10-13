import { IsNotEmpty, MaxLength, Min, ValidateNested } from "class-validator";
import { CustomerAddressCreateDTO } from "../customerAdress/customerAddress.dto";

class CustomerDTO {
  id_customer: bigint;
  name: string;
  last_name: string;
  complete_name: string;
  email: string;
  birth_date: string;
  phone_number: string;
}

class CustomerCreateCompleteDTO {
  @ValidateNested()
  customer: CustomerCreateDTO = new CustomerCreateDTO();
  @ValidateNested()
  address: CustomerAddressCreateDTO = new CustomerAddressCreateDTO();
}

class CustomerCreateDTO {
  @IsNotEmpty({ message: "Name place is invalid" })
  @MaxLength(100, { message: "Name place is too long" })
  name: string;

  @IsNotEmpty({ message: "Last name place is invalid" })
  @MaxLength(155, { message: "Last name place is too long" })
  last_name: string;

  @IsNotEmpty({ message: "Email place is invalid" })
  @MaxLength(255, { message: "Email place is too long" })
  email: string;

  @IsNotEmpty({ message: "Password place is invalid" })
  @MaxLength(50, { message: "Password place is too long" })
  password: string;

  @IsNotEmpty({ message: "Birth date place is invalid" })
  @MaxLength(10, { message: "Birth date place is too long" })
  birth_date: string;

  @IsNotEmpty({ message: "Phone number place is invalid" })
  @MaxLength(20, { message: "Phone number place is too long" })
  phone_number: string;
}

class CustomerUpdateDTO {
  @Min(1, { message: "Id customer address is invalid" })
  id_customer: number;

  @IsNotEmpty({ message: "Name place is invalid" })
  @MaxLength(100, { message: "Name place is too long" })
  name: string;

  @IsNotEmpty({ message: "Last name place is invalid" })
  @MaxLength(155, { message: "Last name place is too long" })
  last_name: string;

  @IsNotEmpty({ message: "Birth date place is invalid" })
  @MaxLength(10, { message: "Birth date place is too long" })
  birth_date: string;

  @IsNotEmpty({ message: "Phone number place is invalid" })
  @MaxLength(20, { message: "Phone number place is too long" })
  phone_number: string;
}

class CustomerUpdatePasswordDTO {
  @IsNotEmpty({ message: "Old password place is invalid" })
  @MaxLength(50, { message: "Old password place is too long" })
  old_password: string;

  @IsNotEmpty({ message: "New password place is invalid" })
  @MaxLength(50, { message: "New password place is too long" })
  new_password: string;
}

export {
  CustomerCreateDTO,
  CustomerUpdateDTO,
  CustomerDTO,
  CustomerCreateCompleteDTO,
  CustomerUpdatePasswordDTO
};
