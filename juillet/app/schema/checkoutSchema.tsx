import * as Yup from "yup";

export const checkoutSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  mobileNumber: Yup.string()
    .matches(
      /^(\+977)?\s?9\d{9}$/,
      "Mobile number must be a valid Nepalese number starting with 9"
    )
    .required("Mobile number is required"),

  location: Yup.string()
    .oneOf(["insideValley", "outsideValley"], "Please select a valid location")
    .required("Location is required"),

  detailedAddress: Yup.string()
    .min(10, "Please provide a more detailed address")
    .required("Detailed address is required"),
});
