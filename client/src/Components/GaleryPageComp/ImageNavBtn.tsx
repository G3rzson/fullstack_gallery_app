import { useEffect } from "react";
import type { GaleryImageType } from "../../Types/types";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

type Props = {
  galeryImagesArray: GaleryImageType[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  direction: "prev" | "next";
};

export default function ImageNavBtn({
  galeryImagesArray,
  setIndex,
  direction,
}: Props) {
  // figyeli a billentyűzet eseményeket
  function handleKeyDown(event: KeyboardEvent) {
    if (direction === "prev" && event.key === "ArrowLeft") {
      prevImage();
    } else if (direction === "next" && event.key === "ArrowRight") {
      nextImage();
    }
  }

  // billentyűzet események kezelése
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction, galeryImagesArray.length, setIndex]);

  // gomb kattintás kezelése
  function handleClick(direction: "prev" | "next") {
    if (direction === "prev") {
      prevImage();
    } else {
      nextImage();
    }
  }

  // előző kép
  function prevImage() {
    setIndex(
      (i) => (i - 1 + galeryImagesArray.length) % galeryImagesArray.length
    );
  }

  // következő kép
  function nextImage() {
    setIndex((i) => (i + 1) % galeryImagesArray.length);
  }

  return (
    <button
      onClick={() => handleClick(direction)}
      aria-label={direction === "next" ? "Következő kép" : "Előző kép"}
      className={`absolute top-1/2 -translate-y-1/2 bg-transparent cursor-pointer border-none outline-none ${
        direction === "prev" ? "left-5" : "right-5"
      }`}
    >
      {direction === "next" ? (
        <FaArrowAltCircleRight />
      ) : (
        <FaArrowAltCircleLeft />
      )}
    </button>
  );
}
