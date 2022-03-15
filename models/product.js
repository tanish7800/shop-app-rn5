class Product {
  constructor(id, ownerId, pushToken, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = pushToken
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

export default Product;
