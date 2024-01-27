import 'package:dio/dio.dart';

abstract class BaseApiService {
  static get baseUrl => "http://10.0.2.2:8088/api/v1";

  final Dio dio = Dio();

  Future<dynamic> get({required String url});
  Future<dynamic> post({required String url, dynamic data});
  Future<dynamic> put({required String url, dynamic data});
  Future<dynamic> delete({required String url});
}
