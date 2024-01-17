class UserModel {
  int id;
  String fullname;
  String phoneNumber;
  String address;

  UserModel({
    required this.id,
    required this.fullname,
    required this.phoneNumber,
    required this.address,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json["id"] ?? 0, // Assuming 0 as default, adjust as needed.
      fullname: json["fullname"] ?? 'Hoàng', // Default value for fullname.
      phoneNumber: json["phone_number"] ??
          'No phone number', // Default value for phoneNumber.
      address: json["address"] ?? 'No address', // Default value for address.
    );
  }

  Map<String, dynamic> toJson() => {
        "id": id,
        "fullname": fullname,
        "phone_number": phoneNumber,
        "address": address,
      };
}
