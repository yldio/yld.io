/* eslint-disable react/no-unknown-property */
import React from 'react';

const YldLogo = ({ fillColor, ...props }) => (
  <svg
    {...props}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width="66%"
    height="48%"
    viewBox="0 0 65.39299774169922 48"
  >
    {/*
      If you're here to delete this SVG title for SEO reasons, turn back now.
      This is used for accessibility and wont affect SEO rankings
    */}
    <title>YLD default logo</title>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M15.239 14.207a5.92 5.92 0 1 0 0-11.838 5.92 5.92 0 0 0 0 11.838zm42.206 9.669a5.925 5.925 0 0 0-5.919-5.92 5.926 5.926 0 0 0-5.92 5.92 5.926 5.926 0 0 0 5.92 5.919 5.926 5.926 0 0 0 5.92-5.92zM65.393 0v37.392H57.5v-1.083a13.7 13.7 0 0 1-5.974 1.378c-7.616 0-13.812-6.196-13.812-13.811 0-7.617 6.196-13.813 13.812-13.813a13.7 13.7 0 0 1 5.974 1.379V0h7.893zM37.714 0v37.392h-7.893V15.186L15.24 48H6.603l4.357-9.805L0 14.207h8.678l6.561 14.36 6.381-14.36h8.201V0h7.893z"
    />
  </svg>
);

export default YldLogo;
