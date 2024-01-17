import '../data/remote/api_endpoint.dart';
import '../models/product/product_model.dart';
import '../services/network_api_service.dart';

abstract class ProductRepository {
  Future<List<ProductModel>> getAllProduct();
}

class ProductRepositoryImpl extends ProductRepository {
  final NetworkApiServices _apiServices = NetworkApiServices();

  @override
  Future<List<ProductModel>> getAllProduct() async {
    try {
      dynamic response = await _apiServices.get(url: ApiEndPoint.products);
      List<ProductModel> listProducts = (response['products'] as List)
          .map((json) => ProductModel.fromJson(json))
          .toList();
      return listProducts;
    } catch (e) {
      rethrow;
    }
  }
}
