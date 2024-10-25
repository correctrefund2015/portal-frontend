import React from "react";
import Image from "next/image";

const LoadingImage = ({ size = 24 }: { size?: number }) => {
  return (
    <Image
      src="/icons/loader.svg"
      alt="loader"
      width={size}
      height={size}
      className="animate-spin"
    />
  );
};

export default LoadingImage;
