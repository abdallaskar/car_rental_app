import {BookingForm} from "./Model.js";
class BookingController {
  constructor() {
    this.bookings = this.loadBookingsFromStorage();
  }

  loadBookingsFromStorage() {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      return JSON.parse(storedBookings).map(
        (booking) =>
          new BookingForm(booking.pickupLocation,booking.pickupDate,booking.pickupTime,booking.dropoffLocation,booking.dropoffDate,booking.DropoffTime,
            booking.firstName,booking.lastName,booking.phoneNumber,booking.email,booking.carId,booking.brand,booking.model,booking.type,booking.bookingId)
      );
    }
    return [];
  }

  saveBookingsToStorage() {
    localStorage.setItem("bookings", JSON.stringify(this.bookings));
  }


  createBooking(pickupLocation,pickupDate,pickupTime,dropoffLocation,dropoffDate,dropoffTime,firstName,
    lastName,phoneNumber,email = "Not Provided",carId,brand,model) {
      return new BookingForm(pickupLocation,pickupDate,pickupTime,dropoffLocation,dropoffDate,dropoffTime,
        firstName,lastName,phoneNumber,email,carId,brand,model);
  
  }
  
  addBooking(booking) {
    this.bookings.push(booking);
    this.saveBookingsToStorage();
  }


  getAllBookings() {
    return this.bookings;
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
    return filtered.length > 0 ? filtered : `No bookings found for this brand name`; 
  }
}

export default BookingController;






  // generateNewId() {
  //   if (this.bookings.length === 0) return 1;
  //   return Math.max(...this.bookings.map((booking) => booking.bookingId)) + 1;
  // }
// Migration method for existing bookings
  // migrateBookings(carController) {
  //   this.bookings = this.bookings.map((booking) => {
  //     if (!booking.carId) {
  //       const car = carController.findCarByDetails(booking.brand, booking.model);
  //       booking.carId = car ? car.id : null;
  //     }
  //     return booking;
  //   });
  //   this.saveBookingsToStorage();
  // }
    // removeBooking(bookingId) {
  //   const index = this.bookings.findIndex(
  //     (booking) => booking.bookingId === bookingId
  //   );
  //   if (index !== -1) {
  //     this.bookings.splice(index, 1);
  //     this.saveBookingsToStorage();
  //   }
  // }
    // getBookingsBetweenDates(startDate, endDate) {
  //   return this.bookings.filter((booking) => {
  //     const pickupDate = new Date(booking.pickupDate);
  //     return (
  //       pickupDate >= new Date(startDate) && pickupDate <= new Date(endDate)
  //     );
  //   });
  // }

  // 