
// Car class to represent a car object
class Car {
    constructor(car_id, url_img, brand, model, type, rental_price, description) {
        this.car_id = car_id;
        this.url_img = url_img;
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.description = description;
        this.rental_price = rental_price;
    }

}
export default Car; // Export the Car class for use in other modules