export function renderCarsTable(handleCar, carsTable) {
  carsTable.innerHTML = "";
  const cars = handleCar.getAllCars();

  cars.forEach((car) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${car.car_id}</td>
      <td><img src="${car.url_img}" alt="${
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
