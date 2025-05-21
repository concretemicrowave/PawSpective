import React from "react";
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";

const RadialBlob = ({
  top,
  right,
  bottom,
  left,
  width = 250,
  height = 250,
  style,
  ...props
}) => {
  const positionStyles = {
    position: "absolute",
    zIndex: 0,
    ...(top !== undefined ? { top } : {}),
    ...(right !== undefined ? { right } : {}),
    ...(bottom !== undefined ? { bottom } : {}),
    ...(left !== undefined ? { left } : {}),
  };

  return (
    <Svg
      width={width}
      height={height}
      style={[positionStyles, style]}
      {...props}
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
      <Rect width={width * 1.2} height={height * 1.2} fill="url(#grad)" />
    </Svg>
  );
};

export default RadialBlob;
