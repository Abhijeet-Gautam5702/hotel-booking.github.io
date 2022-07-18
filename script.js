


const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const typesOfRooms = ["standard", "couple", "deluxe"];

function costOfRoom(roomType) {
  for (let i = 0; i < typesOfRooms.length; i++) {
    if (roomType == typesOfRooms[i]) {
      return (i + 1) * 55 * 28.65;
    }
  }
}

function validate(ccNum) {
  let num = ccNum;
  const digits = [];
  let count = 0;
  while (num) {
    count++;
    digits.push(num % 10);
    num = Math.floor(num / 10);
  }
  digits.reverse();
  // console.log(digits);
  let size = digits.length;
  if (size % 2 == 0) {
    for (let i = 0; i < size; i += 2) {
      let newDigit = digits[i] * 2;
      digits[i] = Math.floor(newDigit / 10) + (newDigit % 10);
    }
  } else {
    for (let i = 1; i < size; i += 2) {
      let newDigit = digits[i] * 2;
      digits[i] = Math.floor(newDigit / 10) + (newDigit % 10);
    }
  }
  // console.log(digits);
  let finalSum = 0;
  for (let i = 0; i < size; i++) {
    finalSum += digits[i];
  }
  // console.log(finalSum);
  if (finalSum % 10 == 0) {
    // console.log("valid");
    return true;
  } else {
    // console.log("invalid");
    return false;
  }
}

function validateExpiry(expiryDate) {
  let date = expiryDate;
  const digits = [];
  for (let i = 0; i < expiryDate.length; i++) {
    digits.push(date[i]);
  }
  if (digits.length != 5) {
    return false;
  }
  let month = Number(digits[0] + digits[1]);
  let year = 2000 + Number(digits[3] + digits[4]);
  const currMonth = new Date().getMonth() + 1;
  const currYear = new Date().getFullYear();
  if (month > 12 || month < 1 || year < currYear) {
    return false;
  } else if (month < currMonth && year == currYear) {
    return false;
  }
  return true;
}

function findSize(CCV) {
  let num = CCV;
  const digits = [];
  let count = 0;
  while (num) {
    count++;
    digits.push(num % 10);
    num = Math.floor(num / 10);
  }
  let size = digits.length;
  return size;
}

function firstDigit(ccNum) {
  let num = ccNum;
  const digits = [];
  while (num) {
    digits.push(num % 10);
    num = Math.floor(num / 10);
  }
  digits.reverse();
  return digits[0];
}

function firstTwoDigits(ccNum) {
  let num = ccNum;
  const digits = [];
  while (num) {
    digits.push(num % 10);
    num = Math.floor(num / 10);
  }
  digits.reverse();
  let res = digits[0] * 10 + digits[1];
  return res;
}

function firstFourDigits(ccNum) {
  let num = ccNum;
  const digits = [];
  while (num) {
    digits.push(num % 10);
    num = Math.floor(num / 10);
  }
  digits.reverse();
  let i = 0,
    factor = 1000,
    res = 0;
  while (i < 4) {
    res += digits[i] * factor;
    i++;
    factor /= 10;
  }
  return res;
}

function checkCCcompany(ccNum, CCV) {
  //mastercard
  if (
    findSize(ccNum) == 16 &&
    findSize(CCV) == 3 &&
    ((firstTwoDigits(ccNum) >= 51 && firstTwoDigits(ccNum) <= 55) ||
      (firstFourDigits(ccNum) >= 2221 && firstFourDigits(ccNum) <= 2720))
  ) {
    // console.log("MasterCard credit card.");
    return "mastercard";
  }
  //AMEX
  else if (
    findSize(ccNum) == 15 &&
    findSize(CCV) == 4 &&
    (firstTwoDigits(ccNum) == 34 || firstTwoDigits(ccNum) == 37)
  ) {
    // console.log("AMEx credit card.");
    return "amex";
  }
  //VISA
  else if (
    (findSize(ccNum) == 13 || findSize(ccNum) == 16) &&
    firstDigit(ccNum) == 4 &&
    findSize(CCV) == 3
  ) {
    // console.log("Visa credit card.");
    return "visa";
  } else {
    return undefined;
  }
}
/*----------------------------------------------------------*/

// document.querySelector(".page-1").style.display = "none";
// document.querySelector(".roomImage").style.display = "none";
document.querySelector(".page-2").style.display = "none";
document.querySelector(".thnkUPage").style.display = "none";
// document.querySelector(".page-1").style.display = "none";
document.querySelector(".payment-contnr").style.display = "none";
// document.querySelector(".booking-confirm-contnr").style.display = "block";

const form1 = document.getElementById("form-1");
document.querySelector(".booking-contnr-heading").innerHTML =
  "Book rooms please! Happy Booking :)";

let tenants,
  rooms,
  roomType,
  fname,
  lname,
  email,
  checkIn,
  checkOut,
  duration,
  totalAmount;

if (window.innerWidth <= 528) {
  document.querySelector(".roomImage").style.display = "none";
}

form1.addEventListener("submit", (e) => {
  e.preventDefault();

  const checkInDateFull = new Date(form1.querySelector("#checkIn").value);
  checkIn =
    months[checkInDateFull.getMonth()] +
    " " +
    checkInDateFull.getDate() +
    " " +
    checkInDateFull.getFullYear();

  const checkOutDateFull = new Date(form1.querySelector("#checkOut").value);
  checkOut =
    months[checkOutDateFull.getMonth()] +
    " " +
    checkOutDateFull.getDate() +
    " " +
    checkOutDateFull.getFullYear();

  tenants = form1.querySelector("#noOfTenants").value;
  rooms = form1.querySelector("#noOfRooms").value;
  roomType = form1.querySelector("#roomType").value;
  if (roomType == "Deluxe") {
    document.querySelector("#roomPhoto").src = "rooms/dlx.jpg";
  }
  duration = checkOutDateFull.getDate() - checkInDateFull.getDate();

  form1.style.display = "none";
  document.querySelector(".page-1").style.display = "none";

  //form-2 starts [entering personal details]
  const form2 = document.getElementById("form-2");
  document.querySelector(".page-2").style.display = "block";
  form2.style.display = "block";

  document.querySelector(".booking-contnr-heading").innerHTML =
    "Enter your personal details";

  form2.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelector(".roomImage").style.display = "none";

    fname = form2.querySelector("#fname").value;
    lname = form2.querySelector("#lname").value;
    email = form2.querySelector("#email").value;

    form2.style.display = "none";
    document.querySelector(".page-2").style.display = "none";
    document.querySelector(".booking-contnr-heading").innerHTML =
      "Please confirm your booking details";

    //page-3 starts [booking confirmation page]
    document.querySelector(".booking-confirm-contnr").style.display = "block";

    document.querySelector(".userNameFname").innerHTML = fname;
    document.querySelector(".userNameLname").innerHTML = lname;
    document.querySelector(".checkInOutDate").innerHTML =
      checkIn + " - " + checkOut;
    document.querySelector(".nightsOfStay").innerHTML = duration + " nights";
    document.querySelector(".noOfTenants").innerHTML = tenants;
    document.querySelector(".noOfRooms").innerHTML = rooms;
    document.querySelector(".typeOfRooms").innerHTML = roomType;
    //total amount payable
    totalAmount = duration * rooms * costOfRoom(roomType);
    document.querySelector(".amountPayable").innerHTML = "₹ " + totalAmount;

    //page-4 starts [payment gateway page]
    const confirmBtn = document.querySelector("#confirm");
    confirmBtn.addEventListener("click", (e) => {
      document.querySelector(".amountInfo").innerHTML =
        "Amount Payable : ₹ " + totalAmount;
      document.querySelector(".booking-confirm-contnr").style.display = "none";
      document.querySelector(".payment-contnr").style.display = "flex";
      document.querySelector(".booking-contnr-heading").innerHTML =
        "Just One more step to Go!";

      //page-5 starts [thankYou msg]
      const paymentForm = document.querySelector(".paymentDetails");
      paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const expiryDate = document.querySelector("#expiryDate").value;
        const ccNum = Number(paymentForm.querySelector("#cardNo").value);
        const CCV = paymentForm.querySelector("#CCV").value;
        //now check the company of the credit card
        const ccName = checkCCcompany(ccNum, CCV);
        if (ccName == undefined) {
          alert("CCV or Card number is incorrect!");
        } else if (ccName == "amex" && findSize(CCV) != 4) {
          alert("Ensure that the CCV for your AMEx card is correct!");
        } else if (findSize(ccNum) < 13 || validate(ccNum) == false) {
          alert("You entered an invalid/unsupported Credit Card Number!");
        } else if (validateExpiry(expiryDate) == false) {
          alert("Please enter the correct expiry date!");
        } else {
          document.querySelector("#cc").src =
            "cc-icons/cc-" + ccName + "-brands.svg";
          document.querySelector(".ccName").innerHTML = ccName;
          document.querySelector(".payment-contnr").style.display = "none";
          document.querySelector(".thnkUPage").style.display = "flex";
          document.querySelector(".booking-contnr-heading").innerHTML =
            "Thank You for booking with us!";
        }
      });
    });
  });
});
