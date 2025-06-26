interface Props {
  onSearchChange: (value: string) => void;
}

function InputSearch({ onSearchChange }: Props) {
  return (
    <input
      type="search"
      placeholder="Tìm kiếm..."
      onChange={(e) => onSearchChange(e.target.value.trim())}
      className="p-[6px_10px] border border-[#b0b0b0] inline-block text-[#666] outline-none text-[0.9rem]"
    />
  );
}

export default InputSearch;
