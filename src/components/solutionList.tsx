"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageModal } from "./ImageModal";
import { SolutionItem } from "@/types/solutions";

interface SolutionListProps {
  solutions: SolutionItem[];
}

export default function SolutionList({ solutions }: SolutionListProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      {solutions.map((item) => {
        return (
          <div
            key={item.id}
            className="flex lg:flex-row flex-col items-start gap-6 mt-16 lg:mt-[129px]"
          >
            <div className="bg-main_card_bg lg:w-1/2 rounded-3xl p-6 text-white">
              <h5 className="text-2xl lg:text-3xl font-bold">{item.title}</h5>
              <p className="mt-2 text-base">{item.description}</p>
              <div
                className="mt-2 relative w-full rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item.image)}
              >
                <div className="relative w-full h-full">
                  <img
                    src="/assets/vector/mac_book_icon.svg"
                    alt="macbook"
                    className="w-full h-auto"
                  />

                  <div
                    className="absolute top-[2%] left-[9%] right-[9%] bottom-[11%] bg-white rounded-t-lg overflow-hidden"
                    style={{ boxShadow: "inset 0 0 0 5px white" }}
                  >
                    <div className="absolute inset-[5px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-main_card_bg rounded-3xl p-6 text-white">
                <h5 className="text-xl lg:text-2xl font-medium">
                  {item.functionality}
                </h5>
                <div className="space-y-4 mt-4">
                  {item.functionality_array.map((item) => {
                    return (
                      <div
                        key={item.title.toString()}
                        className="flex items-start gap-2.5"
                      >
                        <div className="w-3 h-3 rounded-full bg-circle_bg mt-2 flex-shrink-0"></div>
                        <div>
                          <h6 className="font-semibold text-lg">
                            {item.title}
                          </h6>
                          <p className="">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 bg-circle_bg rounded-3xl p-6 text-white">
                <h5 className="text-xl lg:text-2xl font-medium">
                  {item.advantages}
                </h5>
                <div className="space-y-4 mt-4">
                  {item.advantages_array.map((x) => {
                    return (
                      <div
                        key={x.toString()}
                        className="flex items-start gap-2.5"
                      >
                        <div className="w-3 h-3 rounded-full bg-white mt-2 flex-shrink-0"></div>
                        <p className="">{x}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Увеличенное изображение"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
