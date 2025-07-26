import React from "react";

const Stopwatch = (props) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5 2h2v1.076A6.502 6.502 0 0 0 8 16a6.5 6.5 0 0 0 5.249-10.335l1.458-1.458-1.414-1.414-1.458 1.458A6.5 6.5 0 0 0 9 3.076V2h2V0H5zm2 4v4h2V6z"
      clipRule="evenodd"
    />
  </svg>
);

export default Stopwatch;
