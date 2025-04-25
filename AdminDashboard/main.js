import CarModel from "./models/CarModel.js";
import BookingModel from "./models/BookingModel.js";
import DashboardView from "./views/DashboardView.js";
import CarView from "./views/CarView.js";
import BookingView from "./views/BookingView.js";
import DashboardController from "./controllers/DashboardController.js";
import CarController from "./controllers/CarController.js";
import BookingController from "./controllers/BookingController.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize models
  const carModel = new CarModel();
  const bookingModel = new BookingModel();

  // Initialize views
  const dashboardView = new DashboardView();
  const carView = new CarView();
  const bookingView = new BookingView();

  // Initialize controllers
  new DashboardController(carModel, bookingModel, dashboardView);
  new CarController(carModel, bookingModel, carView);
  new BookingController(carModel, bookingModel, bookingView);

  // Navigation between sections
  document.querySelectorAll("[data-section]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelectorAll(".nav-link")
        .forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
      document
        .querySelectorAll(".form-section")
        .forEach((section) => section.classList.remove("active"));
      document.getElementById(this.dataset.section).classList.add("active");
    });
  });
});
