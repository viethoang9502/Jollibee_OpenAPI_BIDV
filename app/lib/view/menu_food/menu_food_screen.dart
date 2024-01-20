import 'package:Jollibee/models/product/product_model.dart';
import 'package:Jollibee/repository/product_repository.dart';
import 'package:Jollibee/res/style/app_colors.dart';
import 'package:Jollibee/viewmodels/product_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

import '../../locator.dart';
import '../../services/shared_pref_service.dart';
import '../../utils/validators.dart';
import '../widget/ui_appbar.dart';
import '../widget/ui_product.dart';

class MenuFoodScreen extends StatefulWidget {
  const MenuFoodScreen({Key? key}) : super(key: key);

  @override
  _MenuFoodScreenState createState() => _MenuFoodScreenState();
}

class _MenuFoodScreenState extends State<MenuFoodScreen> {
  late ProductViewModel viewModel;

  @override
  void initState() {
    viewModel =
        ProductViewModel(productRepository: locator<ProductRepository>())
          ..onInitView(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider.value(
      value: viewModel,
      child: Scaffold(
        backgroundColor: AppColors.bgColor,
        appBar: UiAppBar(title: "THỰC ĐƠN"),
        body: Selector<ProductViewModel, List<ProductModel>>(
            selector: (_, viewModel) => viewModel.listProduct,
            builder: (_, viewState, child) => ListView.builder(
                  shrinkWrap: true,
                  itemCount: viewModel.listProduct.length,
                  clipBehavior: Clip.none,
                  scrollDirection: Axis.vertical,
                  itemBuilder: (context, index) {
                    return UiProduct(
                      productId: viewModel.listProduct[index].id.toString(),
                      image: viewModel.listProduct[index].thumbnail.toString(),
                      title: viewModel.listProduct[index].name.toString(),
                      price: NumberFormat.currency(locale: 'vi', symbol: 'VND', decimalDigits: 0)
                          .format(viewModel.listProduct[index].price),
                      onTap: () => SharedPrefService().updateCartWithProductId(
                          viewModel.listProduct[index].id,
                          viewModel.listProduct[index].name.toString(),
                          viewModel.listProduct[index].price,
                          viewModel.listProduct[index].thumbnail.toString()),
                    );
                  },
                )),
      ),
    );
  }
}
