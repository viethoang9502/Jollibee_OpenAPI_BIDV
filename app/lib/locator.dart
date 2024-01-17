import 'package:Jollibee/repository/auth_repository.dart';
import 'package:Jollibee/repository/order_repository.dart';
import 'package:Jollibee/repository/product_repository.dart';
import 'package:Jollibee/repository/user_repository.dart';
import 'package:get_it/get_it.dart';

final GetIt locator = GetIt.instance;
void setupLocator() {
  locator.registerLazySingleton<AuthRepository>(() => AuthRepositoryImpl());
  locator.registerLazySingleton<UserRepository>(() => UserRepositoryImpl());
  locator
      .registerLazySingleton<ProductRepository>(() => ProductRepositoryImpl());
  locator.registerLazySingleton<OrderRepository>(() => OrderRepositoryImpl());
}
