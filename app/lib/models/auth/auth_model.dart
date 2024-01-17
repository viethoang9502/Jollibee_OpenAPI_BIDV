class AuthModel {
  final String message;
  final String token;

  AuthModel({
    required this.message,
    required this.token,
  });

  factory AuthModel.fromJson(Map<String, dynamic> json) {
    return AuthModel(
      message: json['message'] as String,
      token: json['token'] as String,
    );
  }
}
