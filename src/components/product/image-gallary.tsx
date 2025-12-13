"use client";

import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { ProductImage } from "@/types";

interface Props {
  images: ProductImage[];
  productName: string;
}

const ImageGallery: React.FC<Props> = ({ images, productName }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="space-y-2">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {images?.map((img, index) => (
            <CarouselItem key={index}>
              <AspectRatio>
                <Image
                  src={img.url}
                  alt={img.alt_text ?? productName}
                  fill
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="grid grid-cols-4 gap-0.5">
        {images?.map((img, index) => (
          <Button
            onClick={() => scrollTo(index)}
            key={index}
            asChild
            className="w-full h-full"
          >
            <AspectRatio
              className={`border rounded-none opacity-50 hover:opacity-100 ${
                current === index ? "opacity-100" : ""
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt_text ?? productName}
                fill
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
