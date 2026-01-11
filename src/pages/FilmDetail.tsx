import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFilm, fetchByUrl, extractIdFromUrl } from '../services/api';
import { Loader, ErrorMessage, DetailRow } from '../components';
import type { Film, Person, Planet, Starship, Vehicle, Species } from '../types';

export function FilmDetail() {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | null>(null);
  const [characters, setCharacters] = useState<Person[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getFilm(id)
      .then(async (data) => {
        setFilm(data);

        const [c, p, st, v, sp] = await Promise.all([
          Promise.all(data.characters.map((url) => fetchByUrl<Person>(url).catch(() => null))),
          Promise.all(data.planets.map((url) => fetchByUrl<Planet>(url).catch(() => null))),
          Promise.all(data.starships.map((url) => fetchByUrl<Starship>(url).catch(() => null))),
          Promise.all(data.vehicles.map((url) => fetchByUrl<Vehicle>(url).catch(() => null))),
          Promise.all(data.species.map((url) => fetchByUrl<Species>(url).catch(() => null))),
        ]);

        setCharacters(c.filter((x): x is Person => x !== null));
        setPlanets(p.filter((x): x is Planet => x !== null));
        setStarships(st.filter((x): x is Starship => x !== null));
        setVehicles(v.filter((x): x is Vehicle => x !== null));
        setSpecies(sp.filter((x): x is Species => x !== null));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!film) return <ErrorMessage message="Film not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/films" className="text-yellow-400 hover:text-yellow-300 mb-6 inline-block">
        &larr; Back to Films
      </Link>

      <div className="bg-gray-900/80 border border-yellow-400/30 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">{film.title}</h1>
        <p className="text-gray-400 text-lg mb-6">Episode {film.episode_id}</p>

        <div className="bg-black/50 p-6 rounded-lg mb-8 border border-yellow-400/10">
          <p className="text-gray-300 italic leading-relaxed whitespace-pre-line text-sm">
            {film.opening_crawl}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Production</h2>
            <DetailRow label="Director" value={film.director} />
            <DetailRow label="Producer" value={film.producer} />
            <DetailRow label="Release Date" value={new Date(film.release_date).toLocaleDateString()} />
          </div>
        </div>

        {characters.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Characters ({characters.length})</h2>
            <div className="flex flex-wrap gap-2">
              {characters.map((character) => (
                <Link
                  key={character.url}
                  to={`/people/${extractIdFromUrl(character.url)}`}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                >
                  {character.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {planets.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Planets ({planets.length})</h2>
            <div className="flex flex-wrap gap-2">
              {planets.map((planet) => (
                <Link
                  key={planet.url}
                  to={`/planets/${extractIdFromUrl(planet.url)}`}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                >
                  {planet.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {starships.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Starships ({starships.length})</h2>
            <div className="flex flex-wrap gap-2">
              {starships.map((starship) => (
                <Link
                  key={starship.url}
                  to={`/starships/${extractIdFromUrl(starship.url)}`}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                >
                  {starship.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {vehicles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Vehicles ({vehicles.length})</h2>
            <div className="flex flex-wrap gap-2">
              {vehicles.map((vehicle) => (
                <Link
                  key={vehicle.url}
                  to={`/vehicles/${extractIdFromUrl(vehicle.url)}`}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                >
                  {vehicle.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {species.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Species ({species.length})</h2>
            <div className="flex flex-wrap gap-2">
              {species.map((s) => (
                <Link
                  key={s.url}
                  to={`/species/${extractIdFromUrl(s.url)}`}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
