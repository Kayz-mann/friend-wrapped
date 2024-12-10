import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const UngroupedPlaceholderIcon = (props: SvgProps) => (
  <Svg width={34} height={16} fill="none" {...props}>
    <Path
      fill="#E2F4FF"
      d="M32.064.5H2a2 2 0 0 0-2 2v.764c0 .475.18.95.493 1.308 16.576 18.979 28.37 8.275 33.301-1.4.64-1.256-.32-2.672-1.73-2.672Z"
    />
  </Svg>
);
export default UngroupedPlaceholderIcon;
