type Props = {
  text: string;
};

// üres adatokat megjelenítő komponens
export default function EmptyData({ text }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center p-4 text-center">
      {text}
    </div>
  );
}
