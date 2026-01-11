import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle?: string;
  details: { label: string; value: string }[];
  linkTo: string;
  icon?: React.ReactNode;
}

export function Card({ title, subtitle, details, linkTo, icon }: CardProps) {
  return (
    <Link
      to={linkTo}
      className="block bg-gray-900/80 border border-yellow-400/20 rounded-lg p-5 hover:border-yellow-400/60 hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-400/10"
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="text-yellow-400 text-2xl shrink-0">{icon}</div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-yellow-400 font-bold text-lg truncate">{title}</h3>
          {subtitle && (
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          )}
          <div className="mt-3 space-y-1">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-500">{detail.label}:</span>
                <span className="text-gray-300 truncate ml-2">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
