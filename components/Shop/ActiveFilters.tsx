export default function ActiveFilters() {
  const filters = ["Size: M", "$75—$400"];

  return (
    <div className="flex flex-wrap items-center gap-2">
     
      {filters.map((f) => (
        <span
          key={f}
          className="flex items-center gap-2 rounded-full border border-black/15 bg-white px-3 py-1.5 text-sm text-black"
        >
          {f}
          <button
            type="button"
            aria-label={`Remove ${f}`}
            className="text-black/50"
          >
            ✕
          </button>
        </span>
      ))}
      <button
        type="button"
        className="text-sm font-medium text-black underline underline-offset-4 hover:cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
}
