import Car from "./car.js";

class Controller {
  constructor() {
    this.cars = this.loadCarsFromStorage(); // Load cars from localStorage on initialization
  }

  // Load cars from localStorage
  loadCarsFromStorage() {
    const storedCars = localStorage.getItem("cars");
    if (storedCars) {
      const parsedCars = JSON.parse(storedCars);
      return parsedCars.map(
        (car) =>
          new Car(
            car.car_id,
            car.url_img,
            car.brand,
            car.model,
            car.type,
            car.rental_price,
            car.year,
            car.description,
            car.booked
          )
      );
    }
    return [];
  }

  // Save cars to localStorage
  saveCarsToStorage() {
    localStorage.setItem("cars", JSON.stringify(this.cars));
  }

  // Method to create a new car object
  createCar(
    car_id,
    url_img,
    brand,
    model,
    type,
    rental_price,
    year,
    description
  ) {
    const existingCar = this.cars.findIndex(
      (element) => element.car_id === car_id
    );
    if (existingCar === -1) {
      const newCar = new Car(
        car_id,
        url_img,
        brand,
        model,
        type,
        rental_price,
        year,
        description
      );
      return newCar;
    } else {
      throw new Error("Car with this ID already exists.");
    }
  }

  // Method to add a car object to the array
  addCar(car) {
    this.cars.push(car);
    this.saveCarsToStorage(); // Save to localStorage after adding
  }

  // Method to remove a car object from the array by ID
  removeCar(car_id) {
    const index = this.cars.findIndex((element) => element.car_id === car_id);
    if (index !== -1) {
      this.cars.splice(index, 1);
      this.saveCarsToStorage(); // Save to localStorage after removing
    }
  }

  // Method to get all car objects in the array
  getAllCars() {
    return this.cars;
  }

  markCarAsBooked(car_id) {
    const index = this.cars.findIndex((item) => item.car_id == car_id);
    console.log(index);
    if (index !== -1) {
      this.cars[index].setBooked(true);
      this.saveCarsToStorage(); // Save to localStorage after marking as booked
    } else {
      console.log("this id not found index");
    }
  }

  findCarById(car_id) {
    return this.cars.find((car) => car.car_id === car_id);
  }

  // Method to get car objects by Brand name
  getCarsBytype(type) {
    return this.cars.filter((element) =>
      type.toLowerCase() === element.type.toLowerCase() ? element : null
    );
  }

  // Method to get car objects by Type
  getCarsByName(brand) {
    return this.cars.filter((element) =>
      brand.toLowerCase() === element.brand.toLowerCase() ? element : null
    );
  }

  // Method to get available cars
  getCarsAvalible() {
    return this.cars.filter((element) => !element.booked);
  }
  // Method to get unavailable cars
  getCarsNotAvalible() {
    return this.cars.filter((element) => element.booked);
  }
}
export default Controller;
