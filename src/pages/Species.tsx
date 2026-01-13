import { useEffect, useState } from 'react';
import { getSpecies, extractIdFromUrl } from '../services/api';
import { getSpeciesImage } from '../services/images';
import { Card, Loader, PageHeader, ErrorMessage } from '../components';
import type { Species as SpeciesType } from '../types';

export function Species() {
  const [species, setSpecies] = useState<SpeciesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSpecies()
      .then(setSpecies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="Species"
        subtitle="Sentient beings from across the galaxy"
        count={species.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {species.map((s) => {
          const id = extractIdFromUrl(s.url);
          return (
            <Card
              key={s.url}
              title={s.name}
              subtitle={s.classification}
              details={[
                { label: 'Designation', value: s.designation },
                { label: 'Language', value: s.language },
                { label: 'Avg Lifespan', value: s.average_lifespan !== 'unknown' ? `${s.average_lifespan} years` : 'Unknown' },
              ]}
              linkTo={`/species/${id}`}
              imageUrl={getSpeciesImage(id)}
            />
          );
        })}
      </div>
    </div>
  );
}
