export class GeneralBooking { // that appears on the home page .
  constructor(pickupLocation, pickupDate ,pickupTime,dropoffLocation,dropoffDate,DropoffTime){
    this.pickupLocation=pickupLocation;
    this.pickupDate=pickupDate;
    this.pickupTime=pickupTime;
    this.dropoffLocation=dropoffLocation;
    this.dropoffDate=dropoffDate;
    this.DropoffTime=DropoffTime;
  }
}
export class BookingForm extends GeneralBooking {
    constructor(pickupLocation, pickupDate,pickupTime,dropoffLocation,dropoffDate,DropoffTime,firstName,lastName,phoneNumber,email,brand,model,type){
        super(pickupLocation, pickupDate ,pickupTime,dropoffLocation,dropoffDate,DropoffTime);
        this.firstName=firstName;
        this.lastName=lastName;
        this.phoneNumber = phoneNumber;
        this.email=email;
        this.brand=brand;
        this.model=model;
        this.type=type;
    }
}