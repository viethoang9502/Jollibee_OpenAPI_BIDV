import 'package:dio/dio.dart';

abstract class BaseApiService {
  static get baseUrl => "http://192.168.31.103:8099/api/v1";

  final Dio dio = Dio();

  Future<dynamic> get({required String url});
  Future<dynamic> post({required String url, dynamic data});
  Future<dynamic> put({required String url, dynamic data});
  Future<dynamic> delete({required String url});
}
