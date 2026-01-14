type TOCItem = {
  id: string;
  text: string;
  level: number;
  numbering: string;
};

type Props = {
  headings: TOCItem[];
  maxLevel: number;
};
function TableOfContent({ headings, maxLevel }: Props) {
  return (
    <div className="space-y-3">
      <div className="sticky top-0 bg-white border-b border-gray-300 p-3">
        <h5 className=" font-semibold">Nội dung bài viết</h5>
      </div>

      <ol className="text-[0.9rem] font-normal space-y-[10px] p-3 pt-0">
        {headings.map((h) => (
          <li
            key={h.id}
            className="hover:underline underline-offset-2 decoration-[#158ed4] flex"
            style={{
              marginLeft:
                h.level !== maxLevel ? `${(h.level - maxLevel) * 16}px` : "0px",
            }}
          >
            <a href={`#${h.id}`}>
              {h.numbering}. <span className="text-[#158ed4]">{h.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TableOfContent;
