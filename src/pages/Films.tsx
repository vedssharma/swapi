import { useEffect, useState } from 'react';
import { getFilms, extractIdFromUrl } from '../services/api';
import { getFilmImage } from '../services/images';
import { Card, Loader, PageHeader, ErrorMessage } from '../components';
import type { Film } from '../types';

export function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFilms()
      .then((data) => {
        // Sort by episode number
        const sorted = [...data].sort((a, b) => a.episode_id - b.episode_id);
        setFilms(sorted);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="Films"
        subtitle="The complete Star Wars saga"
        count={films.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {films.map((film) => {
          const id = extractIdFromUrl(film.url);
          return (
            <Card
              key={film.url}
              title={film.title}
              subtitle={`Episode ${film.episode_id}`}
              details={[
                { label: 'Director', value: film.director },
                { label: 'Producer', value: film.producer.split(',')[0] },
                { label: 'Release Date', value: new Date(film.release_date).toLocaleDateString() },
              ]}
              linkTo={`/films/${id}`}
              imageUrl={getFilmImage(id)}
            />
          );
        })}
      </div>
    </div>
  );
}
