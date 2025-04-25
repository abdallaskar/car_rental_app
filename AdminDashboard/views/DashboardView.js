export default class DashboardView {
  constructor() {
    this.totalCarsElement = document.getElementById("totalCars");
    this.availableCarsElement = document.getElementById("availableCars");
    this.activeBookingsElement = document.getElementById("activeBookings");
  }

  updateStats(totalCars, availableCars, activeBookings) {
    this.totalCarsElement.textContent = totalCars;
    this.availableCarsElement.textContent = availableCars;
    this.activeBookingsElement.textContent = activeBookings;
  }
}
