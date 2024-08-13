"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

type Props = {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  disabled?: boolean;
};

export const UploadImage = ({ disabled, value, onChange, onRemove }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap w-full">
        {!!value.length &&
          value?.map((url) => (
            <div className="h-[200px] w-[200px] relative rounded-md" key={url}>
              <div className="absolute top-2 right-2 z-10">
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={() => onRemove(url)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                src={url}
                alt="Image"
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
      </div>
      <div>
        <CldUploadWidget onUpload={onUpload} uploadPreset="ilwthnjj">
          {({ open }) => {
            const onClick = () => {
              open();
            };
            return (
              <Button
                type="button"
                variant="secondary"
                disabled={disabled}
                onClick={onClick}
              >
                <ImagePlus className="h-5 w-5 mr-2" /> Upload an image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};
