import { Flex, Box, Text, Stack, Button, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import formValidator from "../utils/formValidator";
import { useCommuteContext } from "../contexts/CommuteContext";
import { FormSelector } from "../component/FormSelector";
import { FormInput } from "../component/FormInput";
import { FormData } from "../types/CommuteTypes";

const Post = () => {
  const { updateConnection } = useCommuteContext();
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Formik<FormData>
      initialValues={{
        name: "",
        stop_one: "",
        stop_two: "",
        stop_three: "",
      }}
      validationSchema={formValidator}
      onSubmit={({ name, stop_one, stop_two, stop_three }) => {
        updateConnection({
          title: name,
          stops: [stop_one, stop_two, stop_three].filter(Boolean),
        });

        toast({
          title: "save succeeded.",
          description: "We've saved your stops for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        navigate("/home-commute");
      }}
    >
      {({ handleSubmit }) => (
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
              <FormInput name="name" label="Name" />
              <FormSelector
                placeholder="Select stop 1"
                name="stop_one"
              ></FormSelector>
              <FormSelector
                placeholder="Select stop 2"
                name="stop_two"
              ></FormSelector>
              <FormSelector
                placeholder="Select stop 3"
                name="stop_three"
              ></FormSelector>
            </Stack>
            <Flex marginTop="100px" gap="10px">
              <Button width="25%" height="50px" type="submit">
                Save
              </Button>
              <Button width="25%" height="50px" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default Post;
