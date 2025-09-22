"use client";
import { useState } from "react";
import Image from "next/image";

type ImageModalProps = {
  src: string;
  alt: string;
  thumb?: React.ReactNode;
};

export default function ImageModal({ src, alt, thumb }: ImageModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Miniatura */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {thumb}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative">
            <Image
              src={src}
              alt={alt}
              width={800}
              height={1200}
              className="h-auto w-auto max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
