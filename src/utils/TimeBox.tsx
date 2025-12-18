const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white px-2 py-1  shadow-sm min-w-9">
    <span className="text-base font-bold text-primary">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] text-muted-foreground">{label}</span>
  </div>
);

export default TimeBox