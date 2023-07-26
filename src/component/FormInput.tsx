import { useFormikContext } from "formik";
import { Text, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { FormData } from "../types/CommuteTypes";

interface FormInputProps {
  name: keyof FormData;
  label: string;
}

export const FormInput = ({ label, name }: FormInputProps) => {
  const { errors, touched, setFieldValue } = useFormikContext<FormData>();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        type="text"
        name={name}
        onChange={(e) => setFieldValue(name, e.target.value)}
      />
      {errors.name && touched.name ? (
        <Text color="red" fontSize="sm" padding="1">
          {errors.name}
        </Text>
      ) : null}
    </FormControl>
  );
};
