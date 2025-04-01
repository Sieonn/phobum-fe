import * as React from "react";
import type { SVGProps } from "react";
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <path fill="#A7FE89" d="M20.758 50V0h8.484v50zM0 29.242v-8.484h50v8.484z" />
  </svg>
);
export default SvgPlus;
