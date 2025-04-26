export function popupModal(id,data){
   let element = document.getElementById(id);
   element.innerHTML=`
   <div class="modal  fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content align-items-center">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Booking Summary</h1>
          <button type="button" class="btn-close justify-self-end" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Full Name: ${data.firstName} ${data.lastName}</p>
          <p>Phone Number: ${data.phoneNumber}</p>
          <p>Pick Up Data: ${data.pickupLocation}, in ${data.pickupDate} at ${data.pickupTime}</p>
          <p>Drop Off Data: ${data.dropoffLocation}, in ${data.dropoffDate} at ${data.DropoffTime}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
}