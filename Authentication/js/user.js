class User {
  constructor(id, name, email, password, isAdmin = false) {
    this.userId = id;
    this.userName = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}

export default User;
