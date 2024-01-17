import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/product/product_model.dart';

class SharedPrefService {
  static final SharedPrefService _instance = SharedPrefService._();

  factory SharedPrefService() {
    return _instance;
  }

  SharedPrefService._();

  static SharedPrefService get instance => _instance;

  Future<void> onInit() async {
    _sharedPref = await SharedPreferences.getInstance();
  }

  late SharedPreferences _sharedPref;

  static const String _USER_TOKEN_KEY = "USER_TOKEN_KEY";
  static const String _USER_REFRESH_TOKEN_KEY = "USER_REFRESH_TOKEN_KEY";
  static const String _USER_CART_KEY = "USER_CART_KEY";

  String? get userToken {
    return _sharedPref.getString(_USER_TOKEN_KEY);
  }

  Future<bool> setUserToken({required String userToken}) {
    return _sharedPref.setString(_USER_TOKEN_KEY, userToken);
  }

  Future<bool> deleteUserToken() {
    return _sharedPref.remove(_USER_TOKEN_KEY);
  }

  String? get userRefreshToken {
    return _sharedPref.getString(_USER_REFRESH_TOKEN_KEY);
  }

  Future<bool> setUserRefreshToken({required String userRefreshToken}) {
    return _sharedPref.setString(_USER_REFRESH_TOKEN_KEY, userRefreshToken);
  }

  Future<bool> deleteUserRefreshToken() {
    return _sharedPref.remove(_USER_REFRESH_TOKEN_KEY);
  }

  Future<bool> updateCartWithProductId(
      int productId, String name, double price, String thumbnail) async {
    final String? cartJson = _sharedPref.getString(_USER_CART_KEY);
    List<ProductModel> cart = cartJson != null
        ? (json.decode(cartJson) as List)
            .map((item) => ProductModel.fromJsonOrder(item))
            .toList()
        : [];

    int index = cart.indexWhere((element) => element.id == productId);

    if (index != -1) {
      cart[index].quantity += 1;
    } else {
      cart.add(ProductModel(
          id: productId,
          name: name,
          price: price,
          thumbnail: thumbnail,
          quantity: 1));
    }

    String updatedCartJson = json.encode(cart.map((e) => e.toJson()).toList());
    print(updatedCartJson);
    return await _sharedPref.setString(_USER_CART_KEY, updatedCartJson);
  }

  Future<List<ProductModel>> getCartData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? cartDataJsonString = prefs.getString(_USER_CART_KEY);
    if (cartDataJsonString != null) {
      List<dynamic> cartJson = json.decode(cartDataJsonString) as List<dynamic>;
      List<ProductModel> cartItems = cartJson
          .map((jsonItem) => ProductModel.fromJsonOrder(jsonItem))
          .toList();
      return cartItems;
    } else {
      return [];
    }
  }

  Future<bool> incrementQuantity(int productId) async {
    final String? cartJson = _sharedPref.getString(_USER_CART_KEY);
    List<ProductModel> cart = cartJson != null
        ? (json.decode(cartJson) as List)
            .map((item) => ProductModel.fromJsonOrder(item))
            .toList()
        : [];

    for (var product in cart) {
      if (product.id == productId) {
        product.quantity += 1;
        break;
      }
    }

    String updatedCartJson = json.encode(cart.map((e) => e.toJson()).toList());
    return await _sharedPref.setString(_USER_CART_KEY, updatedCartJson);
  }

  Future<bool> decrementQuantity(int productId) async {
    final String? cartJson = _sharedPref.getString(_USER_CART_KEY);
    List<ProductModel> cart = cartJson != null
        ? (json.decode(cartJson) as List)
            .map((item) => ProductModel.fromJsonOrder(item))
            .toList()
        : [];

    int indexToRemove = cart.indexWhere(
        (element) => element.id == productId && element.quantity == 1);
    if (indexToRemove != -1) {
      cart.removeAt(indexToRemove);
    } else {
      cart.firstWhere((element) => element.id == productId).quantity -= 1;
    }

    String updatedCartJson = json.encode(cart.map((e) => e.toJson()).toList());
    return await _sharedPref.setString(_USER_CART_KEY, updatedCartJson);
  }

  Future<bool> removeProductFromCart(int productId) async {
    final String? cartJson = _sharedPref.getString(_USER_CART_KEY);
    List<ProductModel> cart = cartJson != null
        ? (json.decode(cartJson) as List)
            .map((item) => ProductModel.fromJsonOrder(item))
            .toList()
        : [];

    cart.removeWhere((product) => product.id == productId);

    String updatedCartJson = json.encode(cart.map((e) => e.toJson()).toList());
    return await _sharedPref.setString(_USER_CART_KEY, updatedCartJson);
  }

  Future<bool> clearCart() async {
    List<ProductModel> emptyCart = [];
    String updatedCartJson =
        json.encode(emptyCart.map((e) => e.toJson()).toList());
    return await _sharedPref.setString(_USER_CART_KEY, updatedCartJson);
  }
}
