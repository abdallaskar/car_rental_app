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

export function renderBookingsTable(handleCar, bookingsTable, bookings) {
  bookingsTable.innerHTML = "";

  bookings.forEach((booking) => {
    const car = handleCar.findCarById(booking.carId);
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${booking.id}</td>
        <td>${car ? `${car.brand} ${car.model}` : "Car not found"}</td>
        <td>${booking.customer}</td>
        <td>${booking.startDate}</td>
        <td>${booking.endDate}</td>
        <td>$${booking.totalPrice}</td>
        <td><span class="badge ${
          booking.status === "Active" ? "bg-primary" : "bg-success"
        }">${booking.status}</span></td>
        <td>
          <button class="btn btn-sm btn-primary">View</button>
          <button class="btn btn-sm btn-danger">Cancel</button>
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
