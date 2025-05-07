import User from "./user.js";

class Controller {
  constructor() {
    this.users = this.loadUsersFromLocalStorage();
  }
  // Load cars from localStorage
  loadUsersFromLocalStorage() {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser;
    }
    return [];
  }

  // Save cars to localStorage
  saveUsersToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }
  // create user and return object fo user
  createUser(userId, name, email, password) {
    const index = this.searchUserUsingId(userId);
    const indexId = this.searchUserUsingEmail(email);
    if (index === -1 && indexId === -1) {
      const user = new User(userId, name, email, password);
      return user;
    } else {
      return -1;
    }
  }
  // add user to system
  addUser(user) {
    this.users.push(user);
    this.saveUsersToLocalStorage();
  }
  // delet user using id
  deletUserUsingId(userId) {
    const index = this.searchUserUsingId(userId);
    if (index != -1) {
      this.users.splice(userId, 1);
      this.saveUsersToLocalStorage();
    }
  }

  // update user using id
  updeateUserData(userId, name, password) {
    const index = this.searchUserUsingId(userId);
    if (index != -1) {
      this.users[index].name = name;
      this.users[index].password = password;
    }
  }
  // get all user
  getAllUsers() {
    return this.users;
  }
  // search about user using email
  searchUserUsingEmail(email) {
    const index = this.users.findIndex(function (element) {
      return element.email === email;
    });
    return index;
  }
  // check if the password is vaild

  isValidPassword(email, password) {
    const index = this.searchUserUsingEmail(email);
    if (index === -1) {
      return false;
    }
    return this.users[index].password === password;
  }
  // check if the logged in is admin or user

  setAdmin(email) {
    const index = this.users.findIndex((user) => user.email === email);
    if (index !== -1) {
      this.users[index].isAdmin = true;
      this.saveUsersToLocalStorage();
    }
  }

  // search about user using id
  searchUserUsingId(userId) {
    const index = this.users.findIndex(function (element) {
      return element.userId === userId;
    });
    return index;
  }

  getUserUsingEmail(email) {
    const user = this.users.find(function (element) {
      return element.email === email;
    });
    return user;
  }
}

export default Controller;
