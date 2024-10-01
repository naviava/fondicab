import { useRef, useState } from "react";
import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/custom-button";

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full items-end justify-center p-5"
      >
        <Text className="text-md font-jbold text-black">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<RegularDot />}
        activeDot={<ActiveDot />}
        onIndexChanged={(idx) => setActiveIndex(idx)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="items-center justify-center p-5">
            <Image
              source={item.image}
              className="h-[300px] w-full"
              resizeMode="contain"
            />
            <View className="mt-10 w-full flex-row items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-bold text-black">
                {item.title}
              </Text>
            </View>
            <Text className="mx-10 mt-3 text-center font-jsemibold text-lg text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton title="Next" styles="mt-10 w-11/12" />
    </SafeAreaView>
  );
}

function RegularDot() {
  return <View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#E2E8F0]" />;
}

function ActiveDot() {
  return <View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#0286FF]" />;
}
