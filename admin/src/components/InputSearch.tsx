import { useRouter, useSearchParams } from "next/navigation";
import { memo, useEffect, useState } from "react";

function InputSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("q", search.trim());
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearch(q);
  }, [searchParams]);

  return (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-[6px_10px] border border-[#b0b0b0] text-[#666] outline-none text-[0.8rem] placeholder:text-[0.8rem]"
      />
    </form>
  );
}

export default memo(InputSearch);
