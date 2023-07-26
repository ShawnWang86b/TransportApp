import { useDataSet } from "../hooks/useDataSet";
import { Text, Select, FormControl } from "@chakra-ui/react";
import { useFormikContext } from "formik";

import { FormData } from "../types/CommuteTypes";

interface FormSelectorProps {
  name: keyof FormData;
  placeholder: string;
}

export const FormSelector = ({ name, placeholder }: FormSelectorProps) => {
  const { stopList } = useDataSet();
  const { errors, touched, setFieldValue } = useFormikContext<FormData>();

  return (
    <FormControl>
      <Select
        data-testid="select"
        placeholder={placeholder}
        name={name}
        onChange={(e) => setFieldValue(name, e.target.value)}
      >
        {stopList.map((stop) => (
          <option key={stop.title} value={stop.id} data-testid="select-option">
            {stop.title}
          </option>
        ))}
      </Select>
      {errors[name] && touched[name] ? (
        <Text color="red" fontSize="sm" padding="1">
          {errors[name]}
        </Text>
      ) : null}
    </FormControl>
  );
};
