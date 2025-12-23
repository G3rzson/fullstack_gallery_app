import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

type Props = {
  onClick: () => void;
  direction: "prev" | "next";
};

export default function ImageNavBtn({ onClick, direction }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "next" ? "Következő kép" : "Előző kép"}
      className={`absolute top-1/2 -translate-y-1/2 bg-transparent cursor-pointer ${
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
