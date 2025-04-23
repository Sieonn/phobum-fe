import * as React from "react";
import type { SVGProps } from "react";

interface PlusProps extends SVGProps<SVGSVGElement> {
  fillColor?: string;  // 기본 색상을 변경할 수 있는 prop 추가
}

const SvgPlus = ({ fillColor = "#A7FE89", ...props }: PlusProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <path fill={fillColor} d="M20.758 50V0h8.484v50zM0 29.242v-8.484h50v8.484z" />
  </svg>
);

export default SvgPlus;
