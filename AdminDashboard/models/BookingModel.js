export default class BookingModel {
  constructor() {
    this.bookings = JSON.parse(localStorage.getItem("bookings")) || [
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
  }

  getAllBookings() {
    return this.bookings;
  }

  getActiveBookings() {
    return this.bookings.filter((booking) => booking.status === "Confirmed");
  }

  updateBookingStatus(id, status) {
    const booking = this.bookings.find((b) => b.id === id);
    if (booking) {
      booking.status = status;
      this.save();
      return true;
    }
    return false;
  }

  deleteBookingsByCarId(carId) {
    this.bookings = this.bookings.filter((booking) => booking.carId !== carId);
    this.save();
  }

  save() {
    localStorage.setItem("bookings", JSON.stringify(this.bookings));
  }
}
