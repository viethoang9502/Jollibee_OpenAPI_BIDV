import 'package:Jollibee/res/constant/app_assets.dart';
import 'package:Jollibee/view/widget/ui_button.dart';
import 'package:Jollibee/view/widget/ui_text.dart';
import 'package:flutter/material.dart';
import '../../res/style/app_colors.dart';
import '../../utils/dimens/dimens_manager.dart';

class UiProduct extends StatelessWidget {
  final String image;
  final String title;
  final String price;
  final String productId;
  final void Function()? onTap;
  const UiProduct(
      {Key? key,
      required this.image,
      required this.title,
      required this.price,
      required this.productId,
      required this.onTap})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 10, left: 8, right: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14.0),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 12.0,
          )
        ],
      ),
      padding: const EdgeInsets.all(12.0),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Image.network("http://192.168.31.103:8099/api/v1/products/images/$image",
              width: 100,
              fit: BoxFit.cover, errorBuilder: (BuildContext context,
                  Object exception, StackTrace? stackTrace) {
            return Image.asset(
              AppAssets.combo1,
              width: 100,
              fit: BoxFit.cover,
            );
          }),
          const SizedBox(width: 8.0),
          Expanded(
            child: Column(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                UIText(
                  title,
                  maxLines: 2,
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                  size: 14.0,
                ),
                UIText(
                  price,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primaryColor,
                  size: 14.0,
                ),
                const SizedBox(height: 8.0),
                SizedBox(
                  width: 120,
                  child: UIButton(
                    onTap: onTap,
                    child: UIText(
                      "THÊM ",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: DimensManager.dimens.setSp(16),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}

double parsePrice(String price) {
  String numericString = price.replaceAll('đ', '').replaceAll('.', '');
  return double.tryParse(numericString) ?? 0.0;
}
