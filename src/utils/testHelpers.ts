export const MOCK_MAPPED_STOP = {
  id: "mock-stop-id",
  mode: "tram",
  title: "Clarendon",
  departures: [
    {
      stop_id: "mock-stop-id",
      route_id: "mock-route-id",
      direction: "0",
      departure_time_utc: "2019-03-21T02:00:00Z",
    },
  ],
  routes: [
    {
      id: "16",
      mode: "mock-route-id",
      title: "East Coburg",
      directions: {
        0: "East Coburg",
        1: "South Melbourne",
      },
    },
  ],
};
