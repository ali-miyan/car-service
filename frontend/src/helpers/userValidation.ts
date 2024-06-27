import { emailRegex, phoneRegex } from "../constants/regex";

export const validateInput = (name: string, value: string) => {
  let error = "";
  switch (name) {
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
      } else if (value.length < 6) {
        error = "At least 6 characters long";
      }
      break;
    default:
      break;
  }
  return error;
};
