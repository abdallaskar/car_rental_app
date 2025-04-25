export default class BookingController {
  constructor(carModel, bookingModel, bookingView) {
    this.carModel = carModel;
    this.bookingModel = bookingModel;
    this.bookingView = bookingView;

    // Initialize view
    this.bookingView.renderBookingsTable(
      this.bookingModel.getAllBookings(),
      this.carModel.getAllCars()
    );

    // Bind event handlers
    this.bookingView.bindUpdateStatus(this.handleStatusUpdate.bind(this));
  }

  handleStatusUpdate(id, status) {
    this.bookingModel.updateBookingStatus(id, status);
    this.bookingView.renderBookingsTable(
      this.bookingModel.getAllBookings(),
      this.carModel.getAllCars()
    );
  }
}
