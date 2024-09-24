import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <aside className="flex items-center gap-[2px]">
      <p className="text-3xl font-bold">Fu</p>
      <Image
        src="/fuzzieLogo.png"
        width={15}
        height={15}
        alt="fuzzie logo"
        className="shadow-sm"
      />{" "}
      <p className="text-3xl font-bold">zie</p>
    </aside>
  );
};

export default Logo;
