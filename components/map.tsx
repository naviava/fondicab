import { useMemo } from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

export function Map() {
  const region = useMemo(() => ({}), []);

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
      className="h-full w-full rounded-2xl"
    >
      <Text>Mapppp</Text>
    </MapView>
  );
}
