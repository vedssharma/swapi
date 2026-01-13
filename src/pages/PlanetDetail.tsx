import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlanet, fetchByUrl, extractIdFromUrl } from '../services/api';
import { getPlanetImage } from '../services/images';
import { Loader, ErrorMessage, DetailRow } from '../components';
import type { Planet, Person, Film } from '../types';

export function PlanetDetail() {
  const { id } = useParams<{ id: string }>();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [residents, setResidents] = useState<Person[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!id) return;

    getPlanet(id)
      .then(async (data) => {
        setPlanet(data);

        const [r, f] = await Promise.all([
          Promise.all(data.residents.map((url) => fetchByUrl<Person>(url).catch(() => null))),
          Promise.all(data.films.map((url) => fetchByUrl<Film>(url).catch(() => null))),
        ]);

        setResidents(r.filter((x): x is Person => x !== null));
        setFilms(f.filter((x): x is Film => x !== null));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!planet) return <ErrorMessage message="Planet not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/planets" className="text-yellow-400 hover:text-yellow-300 mb-6 inline-block">
        &larr; Back to Planets
      </Link>

      <div className="bg-gray-900/80 border border-yellow-400/30 rounded-lg overflow-hidden">
        <div className="md:flex">
          {id && !imageError && (
            <div className="md:w-1/3 bg-gray-800">
              <img
                src={getPlanetImage(id)}
                alt={planet.name}
                className="w-full h-64 md:h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          <div className="flex-1 p-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-6">{planet.name}</h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Physical Properties</h2>
                <DetailRow label="Diameter" value={planet.diameter !== 'unknown' ? `${parseInt(planet.diameter).toLocaleString()} km` : 'Unknown'} />
                <DetailRow label="Rotation Period" value={planet.rotation_period !== 'unknown' ? `${planet.rotation_period} hours` : 'Unknown'} />
                <DetailRow label="Orbital Period" value={planet.orbital_period !== 'unknown' ? `${planet.orbital_period} days` : 'Unknown'} />
                <DetailRow label="Gravity" value={planet.gravity} />
                <DetailRow label="Surface Water" value={planet.surface_water !== 'unknown' ? `${planet.surface_water}%` : 'Unknown'} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Environment</h2>
                <DetailRow label="Climate" value={planet.climate} />
                <DetailRow label="Terrain" value={planet.terrain} />
                <DetailRow label="Population" value={planet.population !== 'unknown' ? parseInt(planet.population).toLocaleString() : 'Unknown'} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 pt-0">
          {residents.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">Notable Residents</h2>
              <div className="flex flex-wrap gap-2">
                {residents.map((resident) => (
                  <Link
                    key={resident.url}
                    to={`/people/${extractIdFromUrl(resident.url)}`}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                  >
                    {resident.name}
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
