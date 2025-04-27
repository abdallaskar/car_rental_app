import {
  renderCarsTable,
  renderDashboardStats,
  renderBookingsTable,
} from "./utils.js";

import handleCar from "../CarListings/JS/controller-instance.js";

import { renderAllCars } from "../CarListings/JS/utils.js";

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
const mainContainer = document.querySelector(".container #cardContainer");

console.log(mainContainer);
// Initialize handleCar

if (handleCar.getAllCars().length === 0) {
  const car1 = handleCar.createCar(
    1,
    "./Images/2.jpg",
    "Toyota",
    "Camry",
    "Sedan",
    30000,
    "2022",
    "A reliable sedan with a comfortable interior and advanced safety features."
  );
  const car2 = handleCar.createCar(
    2,
    "./Images/3.jpg",
    "Honda",
    "Civic",
    "Sedan",
    25000,
    "2022",
    "A compact car known for its reliability and fuel efficiency."
  );
  const car3 = handleCar.createCar(
    3,
    "./Images/4.jpg",
    "Ford",
    "Mustang",
    "Coupe",
    55000,
    "2022",
    "Sports car with a powerful engine and sleek design"
  );
  const car4 = handleCar.createCar(
    4,
    "./Images/5.jpg",
    "Chevrolet",
    "Impala",
    "Sedan",
    22000,
    "2022",
    "Spacious sedan with a comfortable interior."
  );
  handleCar.addCar(car1);
  handleCar.addCar(car2);
  handleCar.addCar(car3);
  handleCar.addCar(car4);
  handleCar.markCarAsBooked(2);
}

// Sample data for bookings (in a real app, this would come from a database)
const bookings = [
  {
    id: 1,
    carId: 2,
    customer: "John Doe",
    startDate: "2023-11-01",
    endDate: "2023-11-05",
    totalPrice: 1500,
    status: "Active",
  },
  {
    id: 2,
    carId: 3,
    customer: "Jane Smith",
    startDate: "2023-11-10",
    endDate: "2023-11-15",
    totalPrice: 1250,
    status: "Completed",
  },
];

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
  renderBookingsTable(handleCar, bookingsTable, bookings);
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
      renderAllCars(handleCar.getAllCars(), mainContainer);
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
      alert("Car updated successfully!");
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
