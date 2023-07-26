import { CommuteCard } from "../component/CommuteCard";
import { Stack, Flex, Text, Box } from "@chakra-ui/react";
import { useCommuteContext } from "../contexts/CommuteContext";

const HomeCommute = () => {
  const { connection, updateConnection } = useCommuteContext();
  console.log(connection, "connection");

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
        {connection
          ? connection.stops.map((stopId) => (
              <CommuteCard key={stopId} stopId={stopId} />
            ))
          : null}
      </Stack>
    </Flex>
  );
};

export default HomeCommute;
