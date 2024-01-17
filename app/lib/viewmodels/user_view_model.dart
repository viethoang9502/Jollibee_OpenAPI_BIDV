import 'package:flutter/material.dart';

import '../models/auth/user_model.dart';
import '../repository/user_repository.dart';
import 'base_view_model.dart';

class UserViewModel extends BaseViewModel {
  final UserRepository userRepository;

  UserViewModel({required this.userRepository});

  UserModel? userModel; // Making it nullable

  @override
  void onInitView(BuildContext context) {
    getUser().then((user) {
      if (user != null) {
        userModel = user;
      } else {}
    }).catchError((error) {});

    super.onInitView(context);
  }

  Future<UserModel?> getUser() async {
    try {
      UserModel fetchedUser = await userRepository.getProfile();
      notifyListeners();
      return fetchedUser;
    } catch (e) {
      return null;
    }
  }
}
