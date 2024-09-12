class UserModel {
  constructor(
    name,
    email,
    password,
    id,
    userType,
    status,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    return new UserModel(
      json.name,
      json.email,
      json.password,
      json.id,
      json.userType,
      json.status,
      json.createdAt,
      json.updatedAt
    );
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      userType: this.userType,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
