import { Flex, Box, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useDataSet } from "../hooks/useDataSet";
import { useMemo } from "react";
import { ReactComponent as Train } from "../assets/train.svg";
import { ReactComponent as Tram } from "../assets/tram.svg";
import { ReactComponent as Bus } from "../assets/bus.svg";
import formatDate from "../utils/dateFormater";
interface CommuteCardProps {
  stopId: string;
}

export const getTransportIcon = (mode: string) => {
  switch (mode) {
    case "tram":
      return Tram;
    case "train":
      return Train;
    default:
      return Bus;
  }
};

export const CommuteCard = ({ stopId }: CommuteCardProps) => {
  const { stopById } = useDataSet();
  const stop = useMemo(() => stopById(stopId), [stopId, stopById]);

  if (!stop) {
    return null;
  }

  const Icon = getTransportIcon(stop.mode);

  return (
    <Flex
      data-testid="commute-card"
      alignItems="center"
      boxShadow="base"
      rounded="md"
      paddingY="10px"
      paddingX="20px"
    >
      <ArrowLeftIcon cursor="pointer" _hover={{ opacity: 0.75 }} />

      <Flex
        gap="10px"
        justifyContent="space-between"
        flexGrow="1"
        padding="10px"
      >
        <Flex gap="10px">
          <Icon width="50px" height="50px" data-testid={`icon-${stop.mode}`} />
          <Flex flexDirection="column">
            <Text fontSize="lg" fontWeight="medium">
              {stop.title}
            </Text>
            <Text fontSize="sm">Towards {stop.routes[0]?.title ?? "--"}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Box padding="10px">
        <Text>
          {stop.departures
            .map((departure) => formatDate(departure.departure_time_utc))
            .join(", ")}
        </Text>
      </Box>

      <ArrowRightIcon cursor="pointer" _hover={{ opacity: 0.75 }} />
    </Flex>
  );
};
