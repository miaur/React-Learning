import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(150, "Too Long!")
    .required("Required"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .min(3, "Too Short!")
          .max(100, "Too Long!")
          .required("Required"),
        quantity: Yup.string().max(50, "Too Long!").required("Required"),
        type: Yup.string().min(1, "").required("Required"),
      })
    )
    .required("At least one ingredient is required.")
    .min(1, "Minimum of 1 ingredient"),
  steps: Yup.array()
    .of(Yup.string().min(15, "Too short.").max(1000).required("Required"))
    .required("At least one step is required.")
    .min(1, "Minimum of 1 step"),
});

export const initialFormikvalues = {
  id: "",
  title: "",
  ingredients: [{ quantity: "", name: "", type: "" }],
  steps: [""],
  date: "",
  image: "",
  timetocook: "",
};
