export class Address {
  city: string;
  street: string;
  homeNumber: string;
  apartment: string;

  constructor(city: string, street: string, homeNumber: string, apartment: string) {
    this.city = city;
    this.street = street;
    this.homeNumber = homeNumber;
    this.apartment = apartment;
  }
}
