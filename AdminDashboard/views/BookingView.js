export default class BookingView {
  constructor() {
    this.tableBody = document.getElementById("bookingsTableBody");
  }

  renderBookingsTable(bookings, cars) {
    this.tableBody.innerHTML = "";

    bookings.forEach((booking) => {
      const car = cars.find((c) => c.id === booking.carId);
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = days * (car?.price || 0);

      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${booking.id}</td>
          <td>${booking.customer}</td>
          <td>${car?.brand || "N/A"} ${car?.model || ""}</td>
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
      this.tableBody.appendChild(row);
    });
  }

  bindUpdateStatus(handler) {
    this.tableBody.addEventListener("change", (e) => {
      if (e.target.classList.contains("update-status")) {
        const id = parseInt(e.target.dataset.id);
        const status = e.target.value;
        handler(id, status);
      }
    });
  }
}
