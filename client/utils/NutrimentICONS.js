import {
  faFire,
  faDrumstickBite,
  faBreadSlice,
  faWeight,
  faCubesStacked,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

export function useIcons() {
  const ICONS = [
    { icon: faFire, color: "#FF3C00", key: "calories", label: "calories" },
    {
      icon: faDrumstickBite,
      color: "#C47222",
      key: "protein",
      label: "protein",
    },
    { icon: faBreadSlice, color: "#FAE5D3", key: "carbs", label: "carbs" },
    {
      icon: faWeight,
      color: "#B0B7C6",
      key: "fat",
      label: "fats",
      unitKey: "fats_unit",
    },
    {
      icon: faCubesStacked,
      color: "#fefefe",
      key: "sugar",
      label: "sugar",
      unitKey: "sugars_unit",
    },
    {
      icon: faLeaf,
      color: "#4CAF50",
      key: "fiber",
      label: "fiber",
      unitKey: "fiber_unit",
    },
  ];

  return ICONS;
}
