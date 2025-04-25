export default class CarModel {
  constructor() {
    this.cars = JSON.parse(localStorage.getItem("cars")) || [
      {
        id: 1,
        brand: "Toyota",
        model: "Camry",
        type: "Sedan",
        year: 2022,
        price: 50,
        image: "camry.jpg",
        description: "Comfortable sedan",
        available: true,
      },
      {
        id: 2,
        brand: "Ford",
        model: "Explorer",
        type: "SUV",
        year: 2021,
        price: 70,
        image: "explorer.jpg",
        description: "Spacious SUV",
        available: true,
      },
    ];
  }

  getAllCars() {
    return this.cars;
  }

  getAvailableCars() {
    return this.cars.filter((car) => car.available);
  }

  getCarById(id) {
    return this.cars.find((car) => car.id === id);
  }

  addCar(carData) {
    const newId =
      this.cars.length > 0 ? Math.max(...this.cars.map((c) => c.id)) + 1 : 1;
    const newCar = { ...carData, id: newId };
    this.cars.push(newCar);
    this.save();
    return newCar;
  }

  updateCar(id, carData) {
    const index = this.cars.findIndex((car) => car.id === id);
    if (index !== -1) {
      this.cars[index] = { ...this.cars[index], ...carData };
      this.save();
      return true;
    }
    return false;
  }

  deleteCar(id) {
    this.cars = this.cars.filter((car) => car.id !== id);
    this.save();
    return true;
  }

  save() {
    localStorage.setItem("cars", JSON.stringify(this.cars));
  }
}
