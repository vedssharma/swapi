import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle?: string;
  details: { label: string; value: string }[];
  linkTo: string;
  icon?: React.ReactNode;
  imageUrl?: string;
}

export function Card({ title, subtitle, details, linkTo, icon, imageUrl }: CardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={linkTo}
      className="block bg-gray-900/80 border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/60 hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-400/10"
    >
      {imageUrl && !imageError && (
        <div className="aspect-[4/3] bg-gray-800 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
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
      </div>
    </Link>
  );
}
