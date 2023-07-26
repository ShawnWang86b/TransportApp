import {
  Flex,
  Box,
  Text,
  Stack,
  Button,
  Select,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import formValidator from "./formValidator";
import { useDataSet } from "../hooks/useDataSet";
import { useCommuteContext } from "../contexts/CommuteContext";

const Post = () => {
  const { updateConnection } = useCommuteContext();
  const { stopList } = useDataSet();

  const toast = useToast();
  const navigate = useNavigate();

  const handleSaveClick = () => {};
  const handleUpdateStopOne = (e: any) => {
    setFieldValue("stop_one", e.target.value);
  };
  const handleUpdateStopTwo = (e: any) => {
    setFieldValue("stop_two", e.target.value);
  };
  const handleUpdateStopThree = (e: any) => {
    setFieldValue("stop_three", e.target.value);
  };

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        stop_one: "",
        stop_two: "",
        stop_three: "",
      },
      validationSchema: formValidator,
      onSubmit: ({ name, stop_one, stop_two, stop_three }) => {
        updateConnection({
          title: values.name,
          stops: [stop_one, stop_two, stop_three].filter(Boolean),
        });

        toast({
          title: "save succeeded.",
          description: "We've saved your stops for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Flex
        flexDirection="column"
        maxWidth="5xl"
        margin="auto"
        boxShadow="md"
        rounded="base"
        height="600px"
        padding="30px"
        gap="20px"
      >
        <Box>
          <Text fontSize="3xl" fontWeight="bold">
            New connection
          </Text>
        </Box>

        <Stack width="90%" spacing="4">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" onChange={handleChange} />
            {errors.name && touched.name ? (
              <Text color="red" fontSize="sm" padding="1">
                {errors.name}
              </Text>
            ) : null}
          </FormControl>

          <FormControl>
            <Select
              placeholder="Select stop one"
              onChange={handleUpdateStopOne}
            >
              {stopList.map((stop) => (
                <option key={stop.title} value={stop.id}>
                  {stop.title}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <Select placeholder="Select stop" onChange={handleUpdateStopTwo}>
              {stopList.map((stop) => (
                <option key={stop.title} value={stop.id}>
                  {stop.title}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <Select placeholder="Select stop" onChange={handleUpdateStopThree}>
              {stopList.map((stop) => (
                <option key={stop.title} value={stop.id}>
                  {stop.title}
                </option>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Button
          width="25%"
          height="50px"
          type="submit"
          marginTop="160px"
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default Post;
