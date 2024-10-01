import { ButtonProps } from "@/types/type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBgVariantStyle(variant: ButtonProps["bgVariant"]) {
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

export function getTextVariantStyle(variant: ButtonProps["textVariant"]) {
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