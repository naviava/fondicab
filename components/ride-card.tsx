import { View, Text, Image } from "react-native";

import { icons } from "~/constants";
import { Ride } from "~/types/type";

import { formatDate, formatTime } from "~/utils";
import { cn } from "~/lib/utils";

interface IProps {
  ride: Ride;
}

export function RideCard({ ride }: IProps) {
  return (
    // Main container.
    <View className="mb-3 flex-row items-center justify-center rounded-lg bg-white shadow-sm shadow-neutral-300">
      {/* Inner container. */}
      <View className="items-center justify-center p-3">
        {/* Flex container. */}
        <View className="flex-row items-center justify-between">
          {/* Geoapify map. */}
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="h-[90px] w-[80px] rounded-lg"
          />
          {/* Addresses */}
          <View className="mx-5 flex-1 gap-y-5">
            {/* Origin address. */}
            <View className="flex-row items-center gap-x-2">
              <Image source={icons.to} className="h-5 w-5" />
              <Text className="text-md font-jmedium" numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>
            {/* Destination address. */}
            <View className="flex-row items-center gap-x-2">
              <Image source={icons.point} className="h-5 w-5" />
              <Text className="text-md font-jmedium" numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>
        {/* Date & time. */}
        <View className="mt-5 w-full items-start justify-center rounded-lg bg-general-500 p-3">
          <View className="mb-5 w-full flex-row items-center justify-between">
            <Text className="text-md font-jmedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-md font-jmedium text-gray-500">
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>
          {/* Driver name. */}
          <View className="mb-5 w-full flex-row items-center justify-between">
            <Text className="text-md font-jmedium text-gray-500">Driver</Text>
            <Text className="text-md font-jmedium text-gray-500">
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>
          {/* Car seats. */}
          <View className="mb-5 w-full flex-row items-center justify-between">
            <Text className="text-md font-jmedium text-gray-500">
              Car Seats
            </Text>
            <Text className="text-md font-jmedium text-gray-500">
              {ride.driver.car_seats}
            </Text>
          </View>

          <View className="mb-5 w-full flex-row items-center justify-between">
            <Text className="text-md font-jmedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={cn(
                "text-md font-jmedium capitalize text-gray-500",
                ride.payment_status === "paid"
                  ? "text-green-500"
                  : "text-red-500",
              )}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
