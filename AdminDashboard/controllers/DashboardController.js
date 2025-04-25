export default class DashboardController {
  constructor(carModel, bookingModel, dashboardView) {
    this.carModel = carModel;
    this.bookingModel = bookingModel;
    this.dashboardView = dashboardView;
    this.updateStats();
  }

  updateStats() {
    const totalCars = this.carModel.getAllCars().length;
    const availableCars = this.carModel.getAvailableCars().length;
    const activeBookings = this.bookingModel.getActiveBookings().length;
    this.dashboardView.updateStats(totalCars, availableCars, activeBookings);
  }
}
