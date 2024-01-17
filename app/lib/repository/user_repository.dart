import '../data/remote/api_endpoint.dart';
import '../models/auth/user_model.dart';
import '../services/network_api_service.dart';

abstract class UserRepository {
  UserModel? _profile;
  UserModel? get profile => _profile;

  Future<UserModel> getProfile();
}

class UserRepositoryImpl extends UserRepository {
  final NetworkApiServices _apiServices = NetworkApiServices();

  @override
  Future<UserModel> getProfile() async {
    try {
      if (_profile == null) {
        dynamic response = await _apiServices.post(url: ApiEndPoint.userDetail);
        _profile = UserModel.fromJson(response);
      }
      return _profile!;
    } catch (e) {
      rethrow;
    }
  }
}
