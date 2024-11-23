import { useMemo } from "react";
import { Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { calculateRegion } from "~/lib/map";
import { useDriverStore } from "~/store/driver";
import { useLocationStore } from "~/store/location";

export function Map() {
  const {
    userLongitude,
    userLatitude,
    destinationLongitude,
    destinationLatitude,
  } = useLocationStore((state) => state);

  const { selectedDriver, setDrivers } = useDriverStore((state) => state);

  const region = useMemo(
    () =>
      calculateRegion({
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }),
    [userLatitude, userLongitude, destinationLatitude, destinationLongitude],
  );

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
      className="h-full w-full rounded-2xl"
    >
      <Text>Mapppp</Text>
    </MapView>
  );
}
