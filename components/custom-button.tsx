import { cn } from "~/lib/utils";
import { ButtonProps } from "~/types/type";
import { Text, TouchableOpacity } from "react-native";

export default function CustomButton({
  title,
  IconLeft,
  IconRight,
  bgVariant = "primary",
  textVariant = "default",
  styles,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className={cn(
        "w-full flex-row items-center justify-center rounded-full bg-green-500 p-3 shadow-md shadow-neutral-400/70",
        getBgVariantStyle(bgVariant),
        styles,
      )}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={cn("text-lg font-bold", getTextVariantStyle(textVariant))}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
}

function getBgVariantStyle(variant: ButtonProps["bgVariant"]) {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";

    case "danger":
      return "bg-red-500";

    case "success":
      return "bg-green-500";

    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";

    default:
      return "bg-[#0286FF]";
  }
}

function getTextVariantStyle(variant: ButtonProps["textVariant"]) {
  switch (variant) {
    case "primary":
      return "text-black";

    case "secondary":
      return "text-gray-100";

    case "danger":
      return "text-red-100";

    case "success":
      return "text-green-100";

    default:
      return "text-white";
  }
}
