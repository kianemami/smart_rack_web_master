import { iconPack } from "../assets/icons/icons";

export const useIcon = ({ iconName, width, height }) => {
  return iconPack(width, height).find((item) => {
    return iconName === item.name && item.icon;
  }).icon;
};
