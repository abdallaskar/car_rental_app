
import Car from "./car.js";
// Controller class to manage car objects and their operations
// This class is responsible for creating, adding, removing, and sorting car objects
// as well as filtering them by type and finding them by ID.
class Controller {
    constructor() {
        this.cars = []; // Array to hold car objects
    }
    // Method to create a new car object
    createCar(car_id, url_img, brand, model, type, year, description, rental_price) {
        const existingCar = this.cars.findIndex(function (element) {
            return element.car_id === car_id;
        });
        if (existingCar == -1) {
            const newCar = new Car(car_id, url_img, brand, model, type, year, description, rental_price);
            // this.addCar(newCar); // Add the new car object to the array
            return newCar;
        }
        else {
            throw new Error("Car with this ID already exists.");
        }
    }
    // Method to add a car object to the array
    addCar(car) {
        this.cars.push(car);
    }
    // Method to remove a car object from the array by ID
    removeCar(car_id) {
        const index = this.cars.findIndex(function (element) {
            return element.car_id === car_id;
        });
        if (index !== -1) {
            this.cars.splice(index, 1);
        }
    }
    // Method to get all car objects in the array
    getAllCars() {
        return this.cars;
    }

    markCarAsBooked(car_id) {
        const index = this.cars.findIndex(car => car.car_id === car_id);
        if (index !== -1) {
            this.cars[index].setBooked(true);
        }
    }
    findCarById(car_id) {
        return this.cars.find(car => car.car_id === car_id);
    }
    // Method to get car objects by Brand name
    getCarsByBrandName(brand) {
        return this.cars.filter(function (element) {
            return brand.toLowerCase() === element.brand.toLowerCase() ? element : null;
        });
    }
    // Method to get car objects by Type
    getCarsByType(type) {
        return this.cars.filter(function (element) {
            return type.toLowerCase() === element.type.toLowerCase() ? element : null;
        });
    }
    // Methot to get cars by avaliblity
    getCarsAvalible() {
        return this.cars.filter(function (element) {
            return element.booked === false ? element : null;
        });
    }
    getCarsNotAvalible() {
        return this.cars.filter(function (element) {
            return element.booked === true ? element : null;
        });
    }
    // Method to sort car objects by rental price in ascending order
    sortCarsByRentalPrice() {
        this.cars.sort(function (element1, element2) {
            return element1.rental_price - element2.rental_price;
        });
    }
    // Method to sort car objects by rental price in descending order
    sortCarsByRentalPriceDesc() {
        this.cars.sort(function (element1, element2) {
            return element2.rental_price - element1.rental_price;
        });
    }

}

export default Controller; // Export the Controller class for use in other modules