import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";

function RadialBlob() {
  return (
    <Svg
      width="250"
      height="250"
      style={{ position: "absolute", top: -80, right: -80 }}
    >
      <Defs>
        <RadialGradient
          id="grad"
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="#FFD9A0" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect width="300" height="300" fill="url(#grad)" />
    </Svg>
  );
}

export default RadialBlob;
