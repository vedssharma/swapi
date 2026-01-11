import { useEffect, useState } from 'react';
import { getStarships, extractIdFromUrl } from '../services/api';
import { Card, Loader, PageHeader, ErrorMessage } from '../components';
import type { Starship } from '../types';

export function Starships() {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStarships()
      .then(setStarships)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="Starships"
        subtitle="Ships that travel through hyperspace"
        count={starships.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {starships.map((starship) => (
          <Card
            key={starship.url}
            title={starship.name}
            subtitle={starship.starship_class}
            details={[
              { label: 'Manufacturer', value: starship.manufacturer },
              { label: 'Model', value: starship.model },
              { label: 'Hyperdrive', value: starship.hyperdrive_rating },
            ]}
            linkTo={`/starships/${extractIdFromUrl(starship.url)}`}
          />
        ))}
      </div>
    </div>
  );
}
