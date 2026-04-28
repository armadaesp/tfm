interface Props {
  questionNumber: number;
  text: string;
  labels: string[];   // scale labels e.g. ["Nunca", ..., "Muy a menudo"]
  value: number | null;
  onChange: (value: number) => void;
  showLabels?: boolean; // show label row above (first item in a group)
}

export default function LikertItem({ questionNumber, text, labels, value, onChange, showLabels = false }: Props) {
  return (
    <div className="py-4 border-b border-surface-border last:border-0">
      {/* Label header row — shown once per section */}
      {showLabels && (
        <div className="hidden sm:grid mb-3" style={{ gridTemplateColumns: `1fr repeat(${labels.length}, minmax(0, 1fr))` }}>
          <div />
          {labels.map((l) => (
            <div key={l} className="text-center text-xs text-text-muted font-medium px-1">{l}</div>
          ))}
        </div>
      )}

      {/* Desktop: question + horizontal radio row */}
      <div className="sm:grid sm:items-center sm:gap-2" style={{ gridTemplateColumns: `1fr repeat(${labels.length}, minmax(0, 1fr))` }}>
        <p className="text-sm text-text-primary mb-3 sm:mb-0 sm:pr-4">
          <span className="font-semibold text-primary mr-1">{questionNumber}.</span>
          {text}
        </p>

        {labels.map((l, idx) => (
          <label
            key={idx}
            title={l}
            className="hidden sm:flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <input
              type="radio"
              name={`q-${questionNumber}`}
              value={idx}
              checked={value === idx}
              onChange={() => onChange(idx)}
              className="sr-only"
            />
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                value === idx
                  ? "border-primary bg-primary"
                  : "border-surface-border bg-white group-hover:border-primary/60"
              }`}
            >
              {value === idx && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span className={`text-xs text-center leading-tight ${value === idx ? "text-primary font-semibold" : "text-text-muted"}`}>
              {idx}
            </span>
          </label>
        ))}
      </div>

      {/* Mobile: vertical option list */}
      <div className="sm:hidden mt-1 flex flex-col gap-1.5">
        {labels.map((l, idx) => (
          <label
            key={idx}
            className={`option-radio ${value === idx ? "option-radio-selected" : "option-radio-unselected"}`}
          >
            <input
              type="radio"
              name={`q-${questionNumber}-mobile`}
              value={idx}
              checked={value === idx}
              onChange={() => onChange(idx)}
              className="sr-only"
            />
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 mr-3 shrink-0 ${
              value === idx ? "border-primary bg-primary" : "border-surface-border"
            }`}>
              {value === idx && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            <span className="font-bold mr-1">{idx}</span> — {l}
          </label>
        ))}
      </div>

      {value === null && (
        <p className="mt-1 text-xs text-accent">* Obligatorio</p>
      )}
    </div>
  );
}
