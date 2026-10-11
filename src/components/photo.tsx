"use client";
import Image from "next/image";
import { useState } from "react";
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo ${className}`}>
      <Image
        src={failed ? "/images/fallback.svg" : src}
        alt={failed ? `${alt} — illustrative fallback` : alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
