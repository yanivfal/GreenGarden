export class Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: string [];

  constructor(id: number, name: string, description = '',
              price = 0, imageUrl = 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png',
              categories = ['all']) {
    this._id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.categories = categories;
  }
}
