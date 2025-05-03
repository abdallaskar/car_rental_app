import { BookingForm } from "./Model.js";
class BookingController {
  constructor() {
    this.bookings = this.loadBookingsFromStorage();
  }

  loadBookingsFromStorage() {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      return JSON.parse(storedBookings).map(
        (booking) =>
          new BookingForm(
            booking.pickupLocation,
            booking.pickupDate,
            booking.pickupTime,
            booking.dropoffLocation,
            booking.dropoffDate,
            booking.dropoffTime,
            booking.firstName,
            booking.lastName,
            booking.phoneNumber,
            booking.email,
            booking.carId,
            booking.brand,
            booking.model,
            booking.bookingId,
            booking.totalCost,
            booking.status || "Active"
          )
      );
    }
    return [];
  }

  saveBookingsToStorage() {
    localStorage.setItem("bookings", JSON.stringify(this.bookings));
  }

  generateUniqueId() {
    if (this.bookings.length === 0) return 1; // Start at 1 if no bookings

    const maxId = Math.max(
      ...this.bookings.map((booking) => Number(booking.bookingId))
    );

    return maxId + 1; // Return next numeric ID
  }

  createBooking(
    pickupLocation,
    pickupDate,
    pickupTime,
    dropoffLocation,
    dropoffDate,
    dropoffTime,
    firstName,
    lastName,
    phoneNumber,
    email,
    carId,
    brand,
    model,
    totalCost,
    status = "Active"
  ) {
    const bookingId = this.generateUniqueId();
    return new BookingForm(
      pickupLocation,
      pickupDate,
      pickupTime,
      dropoffLocation,
      dropoffDate,
      dropoffTime,
      firstName,
      lastName,
      phoneNumber,
      email,
      carId,
      brand,
      model,
      bookingId,
      totalCost,
      status
    );
  }

  addBooking(booking) {
    this.bookings.push(booking);
    this.saveBookingsToStorage();
  }
  getAllBookings() {
    return this.bookings;
  }
  removeBooking(bookingId) {
    const index = this.bookings.findIndex(
      (booking) => booking.bookingId === bookingId
    );
    if (index !== -1) {
      this.bookings.splice(index, 1);
      this.saveBookingsToStorage();
    }
  }

  getBookingsByEmail(email) {
    const filtered = this.bookings.filter(
      (booking) => booking.email.toLowerCase() === email.toLowerCase()
    );
    return filtered.length > 0 ? filtered : `No bookings found for this email`;
  }
  getBookingsByBradName(brand) {
    const filtered = this.bookings.filter(
      (booking) => booking.brand.toLowerCase() === brand.toLowerCase()
    );
    return filtered.length > 0
      ? filtered
      : `No bookings found for this brand name`;
  }

  getBookingById(bookingId) {
    const booking = this.bookings.find(
      (booking) => booking.bookingId === bookingId
    );
    return booking || null;
  }
}

export default BookingController;

