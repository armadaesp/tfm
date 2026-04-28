interface Props {
  current: number; // 1-based current step
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: Props) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="section-label">{label ?? `Paso ${current} de ${total}`}</span>
        <span className="text-xs text-text-muted font-medium">{pct}%</span>
      </div>
      <div className="h-2 bg-surface-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
