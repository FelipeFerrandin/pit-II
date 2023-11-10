import { IsNotEmpty, MaxLength, Min } from "class-validator";

class CustomerAddressUpdateDTO {
  @Min(1, { message: "Id customer address is invalid" })
  id_customer_address: number;

  @IsNotEmpty({ message: "Public place is invalid" })
  @MaxLength(255, { message: "Public place is too long" })
  public_place: string;

  @IsNotEmpty({ message: "District place is invalid" })
  @MaxLength(100, { message: "District is too long" })
  district: string;

  number: number;

  @IsNotEmpty({ message: "City place is invalid" })
  @MaxLength(100, { message: "City is too long" })
  city: string;

  @IsNotEmpty({ message: "State place is invalid" })
  @MaxLength(100, { message: "State is too long" })
  state: string;

  @IsNotEmpty({ message: "Country place is invalid" })
  @MaxLength(100, { message: "Country is too long" })
  country: string;
}

class CustomerAddressCreateDTO {

  @IsNotEmpty({ message: "Public place is invalid" })
  @MaxLength(255, { message: "Public place is too long" })
  public_place: string;

  @IsNotEmpty({ message: "District place is invalid" })
  @MaxLength(100, { message: "District is too long" })
  district: string;

  number: number;

  @IsNotEmpty({ message: "City place is invalid" })
  @MaxLength(100, { message: "City is too long" })
  city: string;

  @IsNotEmpty({ message: "State place is invalid" })
  @MaxLength(100, { message: "State is too long" })
  state: string;

  @IsNotEmpty({ message: "Country place is invalid" })
  @MaxLength(100, { message: "Country is too long" })
  country: string;
}

class CustomerAddressDTO {
  id_customer_address: number;
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
  CustomerAddressDTO
};