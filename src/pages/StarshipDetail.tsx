import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStarship, fetchByUrl, extractIdFromUrl } from '../services/api';
import { getStarshipImage } from '../services/images';
import { Loader, ErrorMessage, DetailRow } from '../components';
import type { Starship, Person, Film } from '../types';

export function StarshipDetail() {
  const { id } = useParams<{ id: string }>();
  const [starship, setStarship] = useState<Starship | null>(null);
  const [pilots, setPilots] = useState<Person[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!id) return;

    getStarship(id)
      .then(async (data) => {
        setStarship(data);

        const [p, f] = await Promise.all([
          Promise.all(data.pilots.map((url) => fetchByUrl<Person>(url).catch(() => null))),
          Promise.all(data.films.map((url) => fetchByUrl<Film>(url).catch(() => null))),
        ]);

        setPilots(p.filter((x): x is Person => x !== null));
        setFilms(f.filter((x): x is Film => x !== null));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!starship) return <ErrorMessage message="Starship not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/starships" className="text-yellow-400 hover:text-yellow-300 mb-6 inline-block">
        &larr; Back to Starships
      </Link>

      <div className="bg-gray-900/80 border border-yellow-400/30 rounded-lg overflow-hidden">
        <div className="md:flex">
          {id && !imageError && (
            <div className="md:w-1/3 bg-gray-800">
              <img
                src={getStarshipImage(id)}
                alt={starship.name}
                className="w-full h-64 md:h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          <div className="flex-1 p-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-2">{starship.name}</h1>
            <p className="text-gray-400 text-lg mb-6">{starship.starship_class}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Specifications</h2>
                <DetailRow label="Model" value={starship.model} />
                <DetailRow label="Manufacturer" value={starship.manufacturer} />
                <DetailRow label="Cost" value={starship.cost_in_credits !== 'unknown' ? `${parseInt(starship.cost_in_credits).toLocaleString()} credits` : 'Unknown'} />
                <DetailRow label="Length" value={starship.length !== 'unknown' ? `${starship.length} m` : 'Unknown'} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Performance</h2>
                <DetailRow label="Max Speed" value={starship.max_atmosphering_speed !== 'n/a' ? `${starship.max_atmosphering_speed} km/h` : 'N/A'} />
                <DetailRow label="Hyperdrive Rating" value={starship.hyperdrive_rating} />
                <DetailRow label="MGLT" value={starship.MGLT} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 pt-0">
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-300 mb-4">Capacity</h2>
              <DetailRow label="Crew" value={starship.crew} />
              <DetailRow label="Passengers" value={starship.passengers} />
              <DetailRow label="Cargo Capacity" value={starship.cargo_capacity !== 'unknown' ? `${parseInt(starship.cargo_capacity).toLocaleString()} kg` : 'Unknown'} />
              <DetailRow label="Consumables" value={starship.consumables} />
            </div>
          </div>

          {pilots.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">Known Pilots</h2>
              <div className="flex flex-wrap gap-2">
                {pilots.map((pilot) => (
                  <Link
                    key={pilot.url}
                    to={`/people/${extractIdFromUrl(pilot.url)}`}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                  >
                    {pilot.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {films.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">Appears In</h2>
              <div className="flex flex-wrap gap-2">
                {films.map((film) => (
                  <Link
                    key={film.url}
                    to={`/films/${extractIdFromUrl(film.url)}`}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                  >
                    {film.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
