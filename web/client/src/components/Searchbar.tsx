import { useSearchContext } from "../hooks/useSearchContext";

export default function Searchbar({ label }: { label: string }) {
  const { searchInput, setSearchInput } = useSearchContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="field-group mt-4">
      <input
        type="text"
        placeholder=" "
        value={searchInput}
        onChange={handleSearch}
        className="field-input"
      />
      <label className="field-label">{label}</label>
    </div>
  );
}
