
// Car class to represent a car object
class Car {
    constructor(car_id, url_img, brand, model, type, rental_price, year, description, booked = false) {
        this.car_id = car_id;
        this.url_img = url_img;
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.rental_price = rental_price;
        this.year = year;
        this.description = description;
        this.booked = booked;
    }

    setBooked(status) {
        this.booked = status;
    }
    isBooked() {
        return this.booked;
    }
}
export default Car; // Export the Car class for use in other modules