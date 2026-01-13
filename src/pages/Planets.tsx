import { useEffect, useState } from 'react';
import { getPlanets, extractIdFromUrl } from '../services/api';
import { getPlanetImage } from '../services/images';
import { Card, Loader, PageHeader, ErrorMessage } from '../components';
import type { Planet } from '../types';

export function Planets() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPlanets()
      .then(setPlanets)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="Planets"
        subtitle="Worlds across the galaxy far, far away"
        count={planets.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {planets.map((planet) => {
          const id = extractIdFromUrl(planet.url);
          return (
            <Card
              key={planet.url}
              title={planet.name}
              subtitle={planet.climate}
              details={[
                { label: 'Population', value: planet.population !== 'unknown' ? parseInt(planet.population).toLocaleString() : 'Unknown' },
                { label: 'Terrain', value: planet.terrain },
                { label: 'Diameter', value: planet.diameter !== 'unknown' ? `${parseInt(planet.diameter).toLocaleString()} km` : 'Unknown' },
              ]}
              linkTo={`/planets/${id}`}
              imageUrl={getPlanetImage(id)}
            />
          );
        })}
      </div>
    </div>
  );
}
