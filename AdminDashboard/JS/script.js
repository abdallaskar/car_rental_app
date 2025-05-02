import {
  renderCarsTable,
  renderDashboardStats,
  renderBookingsTable,
} from "./utils.js";
import handleCar from "../../CarListings/JS/controller-instance.js";
import { InitializeStaticCars } from "./adminController.js";
import handleBook from "../../Booking/JS/bookingController-instance.js";

// DOM Elements
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");
const navLinks = document.querySelectorAll(".sidebar .nav-link");
const sections = document.querySelectorAll(".container-fluid");
const totalCarsElement = document.getElementById("totalCars");
const availableCarsElement = document.getElementById("availableCars");
const bookedCarsElement = document.getElementById("bookedCars");
const recentActivityTable = document
  .getElementById("recentActivity")
  .querySelector("tbody");
const carsTable = document.getElementById("carsTable").querySelector("tbody");
const bookingsTable = document
  .getElementById("bookingsTable")
  .querySelector("tbody");
const saveCarBtn = document.getElementById("saveCarBtn");
const updateCarBtn = document.getElementById("updateCarBtn");

// Initialize handleCar instance with static default data ;
InitializeStaticCars(handleCar);

// Sample data for bookings (in a real app, this would come from a database)

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", function () {
  // Update dashboard stats
  renderDashboardStats(
    handleCar,
    totalCarsElement,
    availableCarsElement,
    bookedCarsElement
  );
  // Load cars table
  renderCarsTable(handleCar, carsTable);

  // Load bookings table
  renderBookingsTable(
    handleBook,
    handleCar,
    bookingsTable,
    handleBook.getAllBookings()
  );

  // Load recent activity
  loadRecentActivity();

  // Set up event listeners
  setupEventListeners();
});

// Add event listeners to edit and delete
carsTable.addEventListener("click", function (e) {
  const target = e.target;
  const carId = parseInt(target.getAttribute("data-id"));
  if (target.classList.contains("edit-car")) {
    editCar(carId);
  } else if (target.classList.contains("delete-car")) {
    deleteCar(carId);
  }
});

function loadRecentActivity() {
  recentActivityTable.innerHTML = "";
  // Sample recent activity (in a real app, this would come from a database)
  const activities = [
    { car: "Toyota Camry", status: "Booked", time: "2 hours ago" },
    { car: "Honda Civic", status: "Returned", time: "1 day ago" },
    { car: "Ford Mustang", status: "Available", time: "2 days ago" },
  ];
  activities.forEach((activity) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${activity.car}</td>
      <td><span class="badge ${
        activity.status === "Booked"
          ? "bg-danger"
          : activity.status === "Returned"
          ? "bg-success"
          : "bg-primary"
      }">${activity.status}</span></td>
      <td>${activity.time}</td>
    `;
    recentActivityTable.appendChild(row);
  });
}

function setupEventListeners() {
  // Sidebar toggle for mobile
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("show");
      mainContent.classList.toggle("shrink");
    });
  }
  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Hide all sections
      sections.forEach((section) => section.classList.add("d-none"));

      // Show the corresponding section
      const target = this.getAttribute("href").substring(1);
      document.getElementById(target).classList.remove("d-none");
    });
  });

  // Save new car
  saveCarBtn.addEventListener("click", function () {
    const brand = document.getElementById("carBrand").value;
    const model = document.getElementById("carModel").value;
    const type = document.getElementById("carType").value;
    const year = document.getElementById("carYear").value;
    const price = document.getElementById("carPrice").value;
    const image = document.getElementById("carImage").value;
    const description = document.getElementById("carDescription").value;

    // Generate a new ID
    const newId =
      Math.max(...handleCar.getAllCars().map((car) => car.car_id), 0) + 1;
    try {
      const newCar = handleCar.createCar(
        newId,
        image,
        brand,
        model,
        type,
        parseFloat(price),
        year,
        description
      );
      handleCar.addCar(newCar);

      // Close modal and reset form
      bootstrap.Modal.getInstance(
        document.getElementById("addCarModal")
      ).hide();
      document.getElementById("addCarForm").reset();

      // Update UI
      bookedCarsElement;
      renderDashboardStats(
        handleCar,
        totalCarsElement,
        availableCarsElement,
        bookedCarsElement
      );
      renderCarsTable(handleCar, carsTable);
      // Show success message
      alert("Car added successfully!");
    } catch (error) {
      alert(error.message);
    }
  });

  // Update car
  updateCarBtn.addEventListener("click", function () {
    const id = parseInt(document.getElementById("editCarId").value);
    const brand = document.getElementById("editCarBrand").value;
    const model = document.getElementById("editCarModel").value;
    const type = document.getElementById("editCarType").value;
    const year = document.getElementById("editCarYear").value;
    const price = document.getElementById("editCarPrice").value;
    const image = document.getElementById("editCarImage").value;
    const description = document.getElementById("editCarDescription").value;
    const status = document.getElementById("editCarStatus").checked;

    const car = handleCar.findCarById(id);
    if (car) {
      // Update car properties
      car.brand = brand;
      car.model = model;
      car.type = type;
      car.year = year;
      car.rental_price = parseFloat(price);
      car.url_img = image;
      car.description = description;
      car.setBooked(!status);

      // Save to localStorage
      handleCar.saveCarsToStorage();

      // Close modal
      bootstrap.Modal.getInstance(
        document.getElementById("editCarModal")
      ).hide();

      // Update UI
      renderDashboardStats(
        handleCar,
        totalCarsElement,
        availableCarsElement,
        bookedCarsElement
      );
      renderCarsTable(handleCar, carsTable);

      // Show success message
      // alert("Car updated successfully!");
    }
  });
}

function editCar(carId) {
  const car = handleCar.findCarById(carId);
  if (car) {
    document.getElementById("editCarId").value = car.car_id;
    document.getElementById("editCarBrand").value = car.brand;
    document.getElementById("editCarModel").value = car.model;
    document.getElementById("editCarType").value = car.type;
    document.getElementById("editCarYear").value = car.year;
    document.getElementById("editCarPrice").value = car.rental_price;
    document.getElementById("editCarImage").value = car.url_img;
    document.getElementById("editCarDescription").value = car.description;
    document.getElementById("editCarStatus").checked = !car.isBooked();

    const editModal = new bootstrap.Modal(
      document.getElementById("editCarModal")
    );
    editModal.show();
  }
}

function deleteCar(carId) {
  if (confirm("Are you sure you want to delete this car?")) {
    handleCar.removeCar(carId);
    renderDashboardStats(
      handleCar,
      totalCarsElement,
      availableCarsElement,
      bookedCarsElement
    );
    renderCarsTable(handleCar, carsTable);
    alert("Car deleted successfully!");
  }
}

// Add event listeners to view and cancel bookings
bookingsTable.addEventListener("click", function (e) {
  const target = e.target;
  const bookingId = parseInt(target.getAttribute("data-id"));
  if (target.classList.contains("view-booking")) {
    viewBooking(bookingId);
  } else if (target.classList.contains("cancel-booking")) {
    cancelBooking(bookingId);
  }
});

function viewBooking(bookingId) {
  const booking = handleBook
    .getAllBookings()
    .find((b) => b.bookingId === bookingId);
  if (booking) {
    // Example: Show booking details in a modal (you can customize this)
    const car = handleCar.findCarById(booking.carId);
    alert(`
      Booking ID: ${booking.bookingId}
      Customer: ${booking.firstName} ${booking.lastName}
      Car: ${car ? `${car.brand} ${car.model}` : "Car not found"}
      Pickup: ${booking.pickupLocation}, ${booking.pickupDate} at ${
      booking.pickupTime
    }
      Dropoff: ${booking.dropoffLocation}, ${booking.dropoffDate} at ${
      booking.dropoffTime
    }
      Email: ${booking.email}
      Phone: ${booking.phoneNumber}
    `);
  }
}

function cancelBooking(bookingId) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    handleBook.removeBooking(bookingId);
    // Update car status to available
    const booking = handleBook
      .getAllBookings()
      .find((b) => b.bookingId === bookingId);
    if (booking) {
      const car = handleCar.findCarById(booking.carId);
      if (car) {
        car.setBooked(false);
        handleCar.saveCarsToStorage();
      }
    }
    // Refresh UI
    renderBookingsTable(
      handleBook,
      handleCar,
      bookingsTable,
      handleBook.getAllBookings()
    );
    renderDashboardStats(
      handleCar,
      totalCarsElement,
      availableCarsElement,
      bookedCarsElement
    );
    alert("Booking cancelled successfully!");
  }
}
