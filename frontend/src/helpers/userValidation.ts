import { emailRegex, phoneRegex } from "../constants/regex";

export const validateInput = (name: string, value: any | undefined) => {
  let error = "";
  console.log(name,value);
  
  switch (name) {
    case "ownerName":
      if (!value) {
        error = "ownername is required";
      } else if (value.length < 3) {
        error = "At least 3 characters";
      }
      break;
    case "companyName":
      if (!value) {
        error = "Company name is required";
      } else if (value.length < 3) {
        error = "At least 3 characters";
      }
      break;
    case "year":
      if (!value) {
        error = "Year is required";
      } else if (value.length < 3) {
        error = "At least 3 characters";
      }
      break;
    case "description":
      if (!value) {
        error = "description is required";
      } else if (value.length < 3) {
        error = "At least 3 characters";
      }
      break;
    case "username":
      if (!value) {
        error = "Username is required";
      } else if (value.length < 3) {
        error = "At least 3 characters";
      }
      break;
    case "email":
      if (!value) {
        error = "Email is required";
      } else if (!emailRegex.test(value)) {
        error = "Email is not valid";
      }
      break;
    case "phone":
      if (!value) {
        error = "Phone number is required";
      } else if (!phoneRegex.test(value)) {
        error = "Phone number is not valid";
      }
      break;
    case "password":
      if (!value) {
        error = "Password is required";
      } else if (value.length < 10) {
        error = "At least 10 characters long";
      }
      break;
    case "contact1":
      if (!value) {
        error = "contact-1 is required";
      } else if (value.length !== 10) {
        error = "Contact-1 must be 10";
      }
      break;
    case "contact2":
      if (!value) {
        error = "contact-2 is required";
      } else if (value.length !== 10) {
        error = "Contact-2 must be 10";
      }
      break;
    case "lisenceNumber":
      if (!value) {
        error = "Lisence number is required";
      } else if (value.length !== 12) {
        error = "Lisence number 12";
      }
      break;
    case "lisenceExpiry":
      if (!value) {
        error = "Lisence Expiry Date is required";
      }
      break;
    case "confirmPassword":
      if (!value) {
        error = "contact-2 is required";
      } else if (value.length < 10) {
        error = "At least 10 characters long";
      }
      break;
    default:
      break;
  }
  return error;
};
