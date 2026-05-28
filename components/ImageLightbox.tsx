'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  startIndex?: number;
  onClose: () => void;
}

export default function ImageLightbox({ images, startIndex = 0, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    // prevent body scroll while open
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const dx = touchEndX.current - touchStartX.current;
    const threshold = 40; // px
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={(e) => {
        if (e.target === wrapperRef.current) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 z-60 p-2 rounded text-white bg-black/30 hover:bg-black/50"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 items-center justify-center p-3 rounded-full bg-black/30 text-white hover:bg-black/50"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="max-w-5xl max-h-[90vh] w-full">
        <div className="relative w-full h-[70vh] md:h-[80vh]">
          <Image
            src={images[index]}
            alt={`Image ${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        {/* thumbnails on mobile */}
        <div className="mt-4 flex items-center justify-center gap-3 overflow-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`h-16 w-16 relative rounded-sm overflow-hidden border ${i === index ? 'ring-2 ring-gold-100 border-gold-500' : 'border-neutral-700/30'}`}
            >
              <Image src={src} alt={`thumb ${i + 1}`} fill className="object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 items-center justify-center p-3 rounded-full bg-black/30 text-white hover:bg-black/50"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
