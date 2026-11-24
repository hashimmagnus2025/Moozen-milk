import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-cream-dark bg-white py-2.5 pl-10 pr-4 text-sm text-charcoal placeholder:text-muted focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/10"
      />
    </div>
  );
}
