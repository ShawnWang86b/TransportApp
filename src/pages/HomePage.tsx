import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const navigate = useNavigate();

  return (
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
          My connections
        </Text>
      </Box>
      <Box>
        <Flex
          cursor="pointer"
          alignItems="center"
          gap="20px"
          fontSize="lg"
          onClick={() => navigate("/home-commute")}
        >
          <ArrowRightIcon />
          Home commute
        </Flex>
      </Box>
      <Button onClick={() => navigate("/post")} height="50px">
        Add new
      </Button>
    </Flex>
  );
};

export default HomePage;
