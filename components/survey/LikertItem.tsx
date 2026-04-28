interface Props {
  questionNumber: number;
  text: string;
  labels: string[];
  value: number | null;
  onChange: (value: number) => void;
  showLabels?: boolean; // kept for API compatibility, handled by parent now
}

export default function LikertItem({ questionNumber, text, labels, value, onChange }: Props) {
  const colTemplate = `3fr repeat(${labels.length}, minmax(32px, 48px))`;

  return (
    <div className="py-3 border-b border-surface-border last:border-0">
      {/* Desktop: question + horizontal radio row */}
      <div className="hidden sm:grid sm:items-center sm:gap-1" style={{ gridTemplateColumns: colTemplate }}>
        <p className="text-sm text-text-primary pr-3">
          <span className="font-semibold text-primary mr-1">{questionNumber}.</span>
          {text}
        </p>
        {labels.map((l, idx) => (
          <label key={idx} title={l} className="flex flex-col items-center gap-1 cursor-pointer group">
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
            <span className={`text-xs ${value === idx ? "text-primary font-semibold" : "text-text-muted"}`}>
              {idx}
            </span>
          </label>
        ))}
      </div>

      {/* Mobile: question then vertical option list */}
      <div className="sm:hidden">
        <p className="text-sm text-text-primary mb-2">
          <span className="font-semibold text-primary mr-1">{questionNumber}.</span>
          {text}
        </p>
        <div className="flex flex-col gap-1.5">
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
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 mr-3 shrink-0 ${
                  value === idx ? "border-primary bg-primary" : "border-surface-border"
                }`}
              >
                {value === idx && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
              <span className="font-bold mr-1">{idx}</span> — {l}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
