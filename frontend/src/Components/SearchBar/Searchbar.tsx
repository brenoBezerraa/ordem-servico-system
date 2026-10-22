import "./Searchbar.css";

interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
}

export function Searchbar({ value, onChange }: SearchbarProps) {
  return (
    <div className="Search-bar">
      <input
        type="text"
        placeholder="Pesquisar..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="button">
        <img src="/procurar.png" alt="Pesquisar" />
      </button>
    </div>
  );
}
