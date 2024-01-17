import 'package:Jollibee/locator.dart';
import 'package:Jollibee/models/product/product_model.dart';
import 'package:Jollibee/repository/product_repository.dart';
import 'package:Jollibee/repository/user_repository.dart';
import 'package:Jollibee/viewmodels/base_view_model.dart';
import 'package:flutter/material.dart';

import '../services/shared_pref_service.dart';

class ProductViewModel extends BaseViewModel {
  final ProductRepository productRepository;
  ProductViewModel({required this.productRepository});

  List<ProductModel> listProduct = [];
  List<ProductModel> listProductOrder = [];
  @override
  void onInitView(BuildContext context) {
    getAllProduct();
    locator<UserRepository>().getProfile();
    super.onInitView(context);
  }

  Future getAllProduct() async {
    try {
      listProduct = await productRepository.getAllProduct();
      notifyListeners();
    } catch (e) {
      return e.toString();
    }
  }

  Future<List<ProductModel?>> fetchCartProducts() async {
    listProductOrder = await SharedPrefService().getCartData();
    return listProductOrder;
  }

  Future<void> incrementQuantity(int productId) async {
    await SharedPrefService().incrementQuantity(productId);
    fetchCartProducts();
    notifyListeners();
  }

  Future<void> decrementQuantity(int productId) async {
    await SharedPrefService().decrementQuantity(productId);
    fetchCartProducts();
    notifyListeners();
  }

  Future<void> removeProductFromCart(int productId) async {
    await SharedPrefService().removeProductFromCart(productId);
    fetchCartProducts();
    notifyListeners();
  }

  Future<void> clearCart() async {
    await SharedPrefService().clearCart();
    fetchCartProducts();
    notifyListeners();
  }

  double get totalCartAmount {
    return listProductOrder.fold(
        0, (total, current) => total + current.price * current.quantity);
  }
}
