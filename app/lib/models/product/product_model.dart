class ProductModel {
  int id;
  String name;
  double price;
  String thumbnail;
  int quantity;

  ProductModel(
      {required this.id,
      required this.name,
      required this.price,
      required this.thumbnail,
      required this.quantity});

  factory ProductModel.fromJson(Map<String, dynamic> json) => ProductModel(
      id: json["id"] ?? 0,
      name: json["name"] ?? '',
      price: json["price"]?.toDouble() ?? 0.0,
      thumbnail: json["thumbnail"] ?? '',
      quantity: json['quantity'] ?? 0);

  factory ProductModel.fromJsonOrder(Map<String, dynamic> json) => ProductModel(
      id: json["id"] ?? 0,
      name: json["name"] ?? '',
      price: json["price"]?.toDouble() ?? 0.0,
      thumbnail: json["thumbnail"] ?? '',
      quantity: json['quantity'] ?? 0);

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "price": price,
        "thumbnail": thumbnail,
        "quantity": quantity
      };
}
