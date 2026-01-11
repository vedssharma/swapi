interface PageHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
}

export function PageHeader({ title, subtitle, count }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-yellow-400 tracking-wide">
        {title}
        {count !== undefined && (
          <span className="text-gray-500 text-2xl ml-3">({count})</span>
        )}
      </h1>
      {subtitle && (
        <p className="text-gray-400 mt-2">{subtitle}</p>
      )}
    </div>
  );
}
