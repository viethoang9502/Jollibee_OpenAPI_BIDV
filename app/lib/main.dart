import 'dart:io';

import 'package:Jollibee/res/style/app_colors.dart';
import 'package:Jollibee/services/shared_pref_service.dart';
import 'package:Jollibee/utils/dimens/dimens_manager.dart';
import 'package:Jollibee/utils/routes/routes.dart';
import 'package:Jollibee/utils/routes/routes_name.dart';
import 'package:flutter/material.dart';

import 'locator.dart';

final RouteObserver<PageRoute> routeObserver = RouteObserver<PageRoute>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initialization(null);
  HttpOverrides.global = MyHttpOverrides();
  setupLocator();

  SharedPrefService.instance.onInit();

  runApp(const MyApp());
}

Future initialization(BuildContext? context) async {
  await Future.delayed(const Duration(seconds: 4));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    DimensManager();
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Jollibee',
      themeMode: ThemeMode.light,
      theme: ThemeData(
        fontFamily: 'Nunito',
        colorScheme:
            ThemeData().colorScheme.copyWith(primary: AppColors.primaryColor),
      ),
      initialRoute: RoutesName.login,
      onGenerateRoute: Routes.routeBuilder,
    );
  }
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..maxConnectionsPerHost = 5
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}
