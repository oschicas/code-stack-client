import React from "react";
import { FadeLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <FadeLoader color="#0D233C" height={10} width={10} radius={15}/>
    </div>
  );
};

export default LoadingSpinner;
