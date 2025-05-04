export function renderCarsTable(handleCar, carsTable) {
  carsTable.innerHTML = "";
  const cars = handleCar.getAllCars();

  cars.forEach((car) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${car.car_id}</td>
      <td><img src="./Images/${car.url_img}" alt="${
      car.brand
    }" style="width: 50px; height: 30px; object-fit: cover;"></td>
      <td>${car.brand}</td>
      <td>${car.model}</td>
      <td>${car.type}</td>
      <td>$${car.rental_price}</td>
      <td><span class="badge ${car.booked ? "bg-danger" : "bg-success"}">${
      car.booked ? "Booked" : "Available"
    }</span></td>
      <td>
        <button class="btn btn-sm btn-primary edit-car" data-id="${
          car.car_id
        }">Edit</button>
        <button class="btn btn-sm btn-danger delete-car" data-id="${
          car.car_id
        }">Delete</button>
      </td>
    `;
    carsTable.appendChild(row);
  });
}

export function renderBookingsTable(handleBook, bookingsTable) {
  bookingsTable.innerHTML = "";
  const bookings = handleBook.getAllBookings();
  bookings.forEach((booking) => {
    // Fetch car details using carId from the booking

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${booking.bookingId}</td>
      <td>${
        booking ? `${booking.brand} ${booking.model}` : "Car not found"
      }</td>
      <td>${booking.firstName}</td>
      <td>${booking.pickupDate}</td>
      <td>${booking.dropoffDate}</td>
      <td>$${booking.totalCost || "N/A"}</td>
      <td><span class="badge ${
        booking.status === "Active" ? "bg-success" : "bg-primary"
      }">${booking.status || "Active"}</span></td>
      <td>
        <button class="btn btn-sm btn-primary view-booking" data-id="${
          booking.bookingId
        }">View</button>
        <button class="btn btn-sm btn-danger cancel-booking" data-id="${
          booking.bookingId
        }">Cancel</button>
      </td>
    `;
    bookingsTable.appendChild(row);
  });
}

export function renderDashboardStats(
  handleCar,
  totalCarsElement,
  availableCarsElement,
  bookedCarsElement
) {
  const allCars = handleCar.getAllCars();
  const availableCars = handleCar.getCarsAvalible();
  const bookedCars = handleCar.getCarsNotAvalible();

  totalCarsElement.textContent = allCars.length;
  availableCarsElement.textContent = availableCars.length;
  bookedCarsElement.textContent = bookedCars.length;
}

// Validation functions
function validateCarBrand(brand, isEdit = false) {
  const errorElement = document.getElementById(
    isEdit ? "editCarBrandError" : "carBrandError"
  );
  if (!brand || !/^[A-Za-z\s]+$/.test(brand)) {
    errorElement.textContent = "Brand must contain only letters and spaces";
    errorElement.classList.remove("d-none");
    return false;
  }
  errorElement.classList.add("d-none");
  return true;
}

function validateCarModel(model, isEdit = false) {
  const errorElement = document.getElementById(
    isEdit ? "editCarModelError" : "carModelError"
  );
  if (!model || !/^[A-Za-z0-9\s-]+$/.test(model)) {
    errorElement.textContent =
      "Model must contain only letters, numbers, spaces, and hyphens";
    errorElement.classList.remove("d-none");
    return false;
  }
  errorElement.classList.add("d-none");
  return true;
}

function validateCarPrice(price, isEdit = false) {
  const errorElement = document.getElementById(
    isEdit ? "editCarPriceError" : "carPriceError"
  );
  const priceNum = parseFloat(price);
  if (isNaN(priceNum) || priceNum <= 0 || priceNum >= 1000) {
    errorElement.textContent =
      "Price must be a positive number and less than 1000 $";
    errorElement.classList.remove("d-none");
    return false;
  }
  errorElement.classList.add("d-none");
  return true;
}

function validateCarYear(year, isEdit = false) {
  const errorElement = document.getElementById(
    isEdit ? "editCarYearError" : "carYearError"
  );
  const currentYear = new Date().getFullYear();
  const yearNum = parseInt(year);
  if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
    errorElement.textContent = `Year must be between 1900 and ${
      currentYear + 1
    }`;
    errorElement.classList.remove("d-none");
    return false;
  }
  errorElement.classList.add("d-none");
  return true;
}

export function validateCarForm(brand, model, price, year, isEdit = false) {
  return (
    validateCarBrand(brand, isEdit) &&
    validateCarModel(model, isEdit) &&
    validateCarPrice(price, isEdit) &&
    validateCarYear(year, isEdit)
  );
}
