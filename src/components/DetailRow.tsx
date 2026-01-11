interface DetailRowProps {
  label: string;
  value: string | number;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex justify-between py-3 border-b border-gray-700/50">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-200 text-right ml-4">{value || 'Unknown'}</span>
    </div>
  );
}
