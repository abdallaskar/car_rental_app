export default class CarController {
  constructor(carModel, bookingModel, carView) {
    this.carModel = carModel;
    this.bookingModel = bookingModel;
    this.carView = carView;

    // Initialize view
    this.carView.renderCarsTable(this.carModel.getAllCars());

    // Bind event handlers
    this.carView.bindAddCar(this.showAddForm.bind(this));
    this.carView.bindCancelForm(this.hideForm.bind(this));
    this.carView.bindSubmitForm(this.handleSubmit.bind(this));
    this.carView.bindEditCar(this.showEditForm.bind(this));
    this.carView.bindDeleteCar(this.handleDelete.bind(this));
  }

  showAddForm() {
    this.carView.showAddForm();
  }

  showEditForm(id) {
    const car = this.carModel.getCarById(id);
    if (car) {
      this.carView.showEditForm(car);
    }
  }

  hideForm() {
    this.carView.hideForm();
  }

  handleSubmit() {
    const formData = this.carView.getFormData();

    if (formData.id) {
      // Update existing car
      this.carModel.updateCar(formData.id, formData);
    } else {
      // Add new car
      this.carModel.addCar(formData);
    }

    this.carView.renderCarsTable(this.carModel.getAllCars());
    this.carView.hideForm();
  }

  handleDelete(id) {
    // Delete related bookings first
    this.bookingModel.deleteBookingsByCarId(id);
    // Then delete the car
    this.carModel.deleteCar(id);
    this.carView.renderCarsTable(this.carModel.getAllCars());
  }
}
