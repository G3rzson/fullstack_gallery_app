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
  function handleKeyDown(event: KeyboardEvent) {
    if (direction === "prev" && event.key === "ArrowLeft") {
      prevImage();
    } else if (direction === "next" && event.key === "ArrowRight") {
      nextImage();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction, galeryImagesArray.length, setIndex]);

  function handleClick(direction: "prev" | "next") {
    if (direction === "prev") {
      prevImage();
    } else {
      nextImage();
    }
  }

  function prevImage() {
    setIndex(
      (i) => (i - 1 + galeryImagesArray.length) % galeryImagesArray.length
    );
  }

  function nextImage() {
    setIndex((i) => (i + 1) % galeryImagesArray.length);
  }

  return (
    <button
      onClick={() => handleClick(direction)}
      aria-label={direction === "next" ? "Következő kép" : "Előző kép"}
      className={`absolute top-1/2 -translate-y-1/2 bg-transparent cursor-pointer border-none outline-none ${
        direction === "prev" ? "left-0" : "right-0"
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
