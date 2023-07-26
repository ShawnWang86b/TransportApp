import DataSet from "../data";
import { useCallback, useMemo } from "react";

export const useDataSet = () => {
  const { stops, routes, departures } = DataSet;

  const stopList = useMemo(() => {
    return stops.map((stop) => {
      const departuresByStop = departures.filter(
        (departure) => departure.stop_id === stop.id
      );

      return {
        ...stop,
        departures: departuresByStop,
        routes: routes.filter(
          (route) =>
            route.id ===
            (departuresByStop.length ? departuresByStop[0].route_id : "")
        ),
      };
    });
  }, [stops, routes, departures]);

  const stopById = useCallback(
    (id: string) => stopList.find((stop) => stop.id === id),
    [stopList]
  );

  return {
    stopList,
    stopById,
  };
};
