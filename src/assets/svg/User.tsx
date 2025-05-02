import * as React from "react";
import type { SVGProps } from "react";
const SvgUser = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#4FD08F"
      d="M12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12M12 13.999a9.01 9.01 0 0 0-9 9 1 1 0 0 0 1 1h16a1 1 0 0 0 1-1 9.01 9.01 0 0 0-9-9"
    />
  </svg>
);
export default SvgUser;
