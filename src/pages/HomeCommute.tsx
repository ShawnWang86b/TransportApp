import { CommuteCard } from "../component/CommuteCard";
import { Stack, Flex, Text, Box, Button } from "@chakra-ui/react";
import { useCommuteContext } from "../contexts/CommuteContext";
import { useNavigate } from "react-router-dom";

const HomeCommute = () => {
  const { connection } = useCommuteContext();
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
          Home Commute
        </Text>
      </Box>
      <Stack>
        {connection ? (
          connection.stops.map((stopId) => (
            <CommuteCard key={stopId} stopId={stopId} />
          ))
        ) : (
          <Text fontSize="lg" fontWeight="semibold">
            There is no my commute now
          </Text>
        )}
      </Stack>
      <Button width="25%" height="50px" onClick={() => navigate("/")}>
        Back
      </Button>
    </Flex>
  );
};

export default HomeCommute;
