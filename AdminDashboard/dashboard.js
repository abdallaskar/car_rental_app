import Controller from ("Controller.js")

const obj = new Controller();

document.addEventListener("DOMContentLoaded", function () {
  let cars = JSON.parse(localStorage.getItem("cars")) || [
    {
      id: 1,
      brand: "Toyota",
      model: "Camry",
      type: "Sedan",
      year: 2022,
      price: 50,
      image: "camry.jpg",
      description: "Comfortable sedan",
      available: true,
    },
    {
      id: 2,
      brand: "Ford",
      model: "Explorer",
      type: "SUV",
      year: 2021,
      price: 70,
      image: "explorer.jpg",
      description: "Spacious SUV",
      available: true,
    },
  ];

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [
    {
      id: 1,
      customer: "John Doe",
      carId: 1,
      startDate: "2023-06-15",
      endDate: "2023-06-20",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Jane Smith",
      carId: 2,
      startDate: "2023-06-18",
      endDate: "2023-06-25",
      status: "Pending",
    },
  ];

  // Save data to localStorage
  function saveData() {
    localStorage.setItem("cars", JSON.stringify(cars));
    localStorage.setItem("bookings", JSON.stringify(bookings));
    updateDashboardStats();
  }

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

  // Dashboard statistics
  function updateDashboardStats() {
    document.getElementById("totalCars").textContent = cars.length;
    document.getElementById("availableCars").textContent = cars.filter(
      (car) => car.available
    ).length;
    document.getElementById("activeBookings").textContent = bookings.filter(
      (b) => b.status === "Confirmed"
    ).length;
  }

  // Cars management
  function renderCarsTable() {
    const tbody = document.getElementById("carsTableBody");
    tbody.innerHTML = "";

    cars.forEach((car) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${car.id}</td>
                    <td><img src="/admin dashboard/carImgs/${car.image}" alt="${
        car.brand
      } ${car.model}" style="height: 50px;"></td>
                    <td>${car.brand}</td>
                    <td>${car.model}</td>
                    <td>${car.type}</td>
                    <td>${car.year}</td>
                    <td>$${car.price}</td>
                    <td><span class="badge ${
                      car.available ? "bg-success" : "bg-danger"
                    }">${car.available ? "Available" : "Booked"}</span></td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-car" data-id="${
                          car.id
                        }">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-car" data-id="${
                          car.id
                        }">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
      tbody.appendChild(row);
    });

    // Add event listeners to edit/delete buttons
    document.querySelectorAll(".edit-car").forEach((btn) => {
      btn.addEventListener("click", () => editCar(parseInt(btn.dataset.id)));
    });

    document.querySelectorAll(".delete-car").forEach((btn) => {
      btn.addEventListener("click", () => deleteCar(parseInt(btn.dataset.id)));
    });
  }

  // Bookings management
  function renderBookingsTable() {
    const tbody = document.getElementById("bookingsTableBody");
    tbody.innerHTML = "";

    bookings.forEach((booking) => {
      const car = cars.find((c) => c.id === booking.carId);
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = days * car.price;

      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.customer}</td>
                    <td>${car.brand} ${car.model}</td>
                    <td>${booking.startDate} to ${booking.endDate}</td>
                    <td>$${totalPrice}</td>
                    <td>
                        <span class="badge ${
                          booking.status === "Confirmed"
                            ? "bg-success"
                            : booking.status === "Pending"
                            ? "bg-warning"
                            : "bg-danger"
                        }">
                            ${booking.status}
                        </span>
                    </td>
                    <td>
                        <select class="form-select form-select-sm update-status" data-id="${
                          booking.id
                        }" style="width: 120px;">
                            <option value="Pending" ${
                              booking.status === "Pending" ? "selected" : ""
                            }>Pending</option>
                            <option value="Confirmed" ${
                              booking.status === "Confirmed" ? "selected" : ""
                            }>Confirmed</option>
                            <option value="Cancelled" ${
                              booking.status === "Cancelled" ? "selected" : ""
                            }>Cancelled</option>
                        </select>
                    </td>
                `;
      tbody.appendChild(row);
    });

    // Add event listeners to status dropdowns
    document.querySelectorAll(".update-status").forEach((select) => {
      select.addEventListener("change", function () {
        const bookingId = parseInt(this.dataset.id);
        const booking = bookings.find((b) => b.id === bookingId);
        booking.status = this.value;
        saveData();
      });
    });
  }

  // Car form handling
  document.getElementById("addCarBtn").addEventListener("click", () => {
    document.getElementById("carFormTitle").textContent = "Add New Car";
    document.getElementById("carForm").reset();
    document.getElementById("carId").value = "";
    document.getElementById("carFormContainer").style.display = "block";
  });

  document.getElementById("cancelCarBtn").addEventListener("click", () => {
    document.getElementById("carFormContainer").style.display = "none";
  });

  function editCar(id) {
    const car = cars.find((c) => c.id === id);
    if (car) {
      document.getElementById("carFormTitle").textContent = "Edit Car";
      document.getElementById("carId").value = car.id;
      document.getElementById("carBrand").value = car.brand;
      document.getElementById("carModel").value = car.model;
      document.getElementById("carType").value = car.type;
      document.getElementById("carYear").value = car.year;
      document.getElementById("carPrice").value = car.price;
      document.getElementById("carImage").value = car.image;
      document.getElementById("carDescription").value = car.description || "";
      document.getElementById("carAvailable").checked = car.available;
      document.getElementById("carFormContainer").style.display = "block";
    }
  }

  function deleteCar(id) {
    if (confirm("Are you sure you want to delete this car?")) {
      cars = cars.filter((car) => car.id !== id);
      saveData();
      renderCarsTable();
    }
  }

  document.getElementById("carForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const carData = {
      id: document.getElementById("carId").value
        ? parseInt(document.getElementById("carId").value)
        : cars.length > 0
        ? Math.max(...cars.map((c) => c.id)) + 1
        : 1,
      brand: document.getElementById("carBrand").value,
      model: document.getElementById("carModel").value,
      type: document.getElementById("carType").value,
      year: parseInt(document.getElementById("carYear").value),
      price: parseFloat(document.getElementById("carPrice").value),
      image: document.getElementById("carImage").value,
      description: document.getElementById("carDescription").value,
      available: document.getElementById("carAvailable").checked,
    };

    if (document.getElementById("carId").value) {
      // Update existing car
      const index = cars.findIndex((c) => c.id === carData.id);
      if (index !== -1) {
        cars[index] = carData;
      }
    } else {
      // Add new car
      cars.push(carData);
    }

    saveData();
    renderCarsTable();
    document.getElementById("carFormContainer").style.display = "none";
    this.reset();
  });

  // Initialize the page
  updateDashboardStats();
  renderCarsTable();
  renderBookingsTable();
});
