import * as Yup from "yup";

const formValidator = Yup.object().shape({
  name: Yup.string().required(),
  stop_one: Yup.string().required(),
});

export default formValidator;
