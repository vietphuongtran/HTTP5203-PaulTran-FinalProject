//alert("hey");
jQuery(document).ready(function() {
    bookingEventLoad()
});
function bookingEventLoad() {
    //show and hide the booking and event div
    jQuery('.hidden').hide();
    jQuery('h2').click(function() {
        $(this).next('div').fadeToggle("5000"); 
    });
    $("#bookingdate").datepicker();
    
    //validate the form
    var formHandle = document.forms[0];
   
    formHandle.onsubmit = processForm;
    function processForm () {
        var isValid = true;
        
        //validate the date
        var bookingDate = formHandle.bookingdate;
        //console.log(bookingDate);
        var regexDate = /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/
        //This regex is retrieved from Reg Ex library, modified by Paul Tran for education purpose
        if (bookingDate.value === "" || bookingDate.value === null || !regexDate.test(bookingDate.value)) {           
            isValid= false;
            bookingDate.focus();
            
        }
        
        //validate location dropdown list
        var bookingQuantity = formHandle.bookingquantity;
        var errorMsg = document.getElementById("error_message");
        errorMsg.innerHTML = "";
         if (bookingQuantity.value === "none") {
            isValid= false;
            errorMsg.innerHTML += "<div>Please specify the number of guests</div>";
            bookingQuantity.focus();
            //return false;
        }
        
        //validate event type
        var eventType = formHandle.event_type;
        var eventRequest = formHandle.event_request;
        if (eventType.value === "") {
            isValid= false;
            errorMsg.innerHTML += "<div>Please specify your type of dining experience</div>";
        }
        //validate name
        var visitorFullName = formHandle.visitor_full_name;
        if (visitorFullName.value === "" || visitorFullName.value === null ) {
            isValid= false;
            errorMsg.innerHTML += "<div>Please tell us your name</div>";
            visitorFullName.focus();
            //return false;
        }
        //validate Phone number
        var regexPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        var visitorPhone = formHandle.visitor_phone;
        if (visitorPhone.value === "" || visitorPhone.value === null || !regexPhone.test(visitorPhone.value)) {
            isValid= false;
            errorMsg.innerHTML += "<div>Please tell us your phone</div>";
            visitorPhone.focus();
            //return false;
        }
        
        
        //validate Email
        var regexEmail = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
        //This regex is retrieved from Reg Ex library, modified by Paul Tran for education purpose
        var visitorEmail = formHandle.visitor_email;        
        if (visitorEmail.value === "" || visitorEmail.value === null || !regexEmail.test(visitorEmail.value)) {
            isValid= false;
            errorMsg.innerHTML += "<div>Please tell us your email</div>";
            visitorEmail.focus();
            //return false;
        }
        //Confirm message
        var confirmMsg = document.getElementById("confirm_message");
        var confirmName = document.getElementById("confirm_name");
        var confirmDate = document.getElementById("confirm_date");
        var confirmQuantity = document.getElementById("confirm_bookingquantity");
        var confirmPhone = document.getElementById("confirm_phone");
        var confirmEmail = document.getElementById("confirm_email");
        var confirmEventType = document.getElementById("confirm_event_type");
        var specialRequest = document.getElementById("special_request");
        var confirmSpecialRequest = document.getElementById("confirm_special_request");
        //console.log(confirmMsg);
        if (isValid) {
            formHandle.style.display = "none";
            confirmMsg.style.display = "block"
            confirmName.innerHTML = visitorFullName.value;
            confirmDate.innerHTML = bookingDate.value;
            if (eventType.value == "others") {
                 confirmEventType.innerHTML = otherEvent.value;             
            }
            else {
                confirmEventType.innerHTML = eventType.value;
            }
            
            if (eventRequest.value !== null || eventRequest.value !== "") {
                specialRequest.style.display = "block";
                confirmSpecialRequest.innerHTML = eventRequest.value;
            }
            if (eventRequest.value == null || eventRequest.value == "") {
                specialRequest.style.display = "none";
                //confirmSpecialRequest.innerHTML = "You have no special request";
            }
            confirmPhone.innerHTML = visitorPhone.value;    
            confirmEmail.innerHTML = visitorEmail.value;           
        }
       //return false;
    }//end validation processForm
}//end EvenLoad
