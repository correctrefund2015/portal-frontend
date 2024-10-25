"use client";

import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const AuthSlider = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="cr-carousel bg-slate-700 text-white rounded-sm px-5 py-6">
            <p className="text-xs font-regular leading-5">
              I&apos;m amazed at how their expert support simplified each step
              and made achieving my goals so much easier. Their guidance was
              invaluable.
            </p>
            <div className="user-container flex items-center relative mt-4">
              <Image
                src="/images/bg-qoute.svg"
                height={24}
                width={32}
                quality={100}
                alt="qoute"
                className="absolute -top-[100px] left-0"
              />
              <Image
                src="/avatars/jason-fung.png"
                width={24}
                height={24}
                className="mr-2"
                alt="userImage"
                quality={100}
              />
              <div className="info-container flex flex-col">
                <h5 className="text-xs">Jason Fung</h5>
                <span className="text-[10px] text-slate-400">
                  Small Business Owner
                </span>
              </div>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="cr-carousel bg-slate-700 text-white rounded-sm px-5 py-6">
            <p className="text-xs font-regular leading-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              quam ex deleniti dolorem laborum iste dicta est quo? Veniam, et.
            </p>
            <div className="user-container flex items-center relative mt-4">
              <Image
                src="/images/bg-qoute.svg"
                height={24}
                width={32}
                quality={100}
                alt="qoute"
                className="absolute -top-[100px] left-0"
              />
              <Image
                src="/avatars/jason-fung.png"
                width={24}
                height={24}
                className="mr-2"
                alt="userImage"
                quality={100}
              />
              <div className="info-container flex flex-col">
                <h5 className="text-xs">Jason Fung</h5>
                <span className="text-[10px] text-slate-400">
                  Small Business Owner
                </span>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default AuthSlider;
