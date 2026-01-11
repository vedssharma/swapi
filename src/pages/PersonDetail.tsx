import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPerson, fetchByUrl, extractIdFromUrl } from '../services/api';
import { Loader, ErrorMessage, DetailRow } from '../components';
import type { Person, Planet, Film, Starship, Vehicle, Species } from '../types';

export function PersonDetail() {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [homeworld, setHomeworld] = useState<Planet | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getPerson(id)
      .then(async (data) => {
        setPerson(data);

        // Fetch related data
        const [hw, f, sp, st, v] = await Promise.all([
          fetchByUrl<Planet>(data.homeworld).catch(() => null),
          Promise.all(data.films.map((url) => fetchByUrl<Film>(url).catch(() => null))),
          Promise.all(data.species.map((url) => fetchByUrl<Species>(url).catch(() => null))),
          Promise.all(data.starships.map((url) => fetchByUrl<Starship>(url).catch(() => null))),
          Promise.all(data.vehicles.map((url) => fetchByUrl<Vehicle>(url).catch(() => null))),
        ]);

        setHomeworld(hw);
        setFilms(f.filter((x): x is Film => x !== null));
        setSpecies(sp.filter((x): x is Species => x !== null));
        setStarships(st.filter((x): x is Starship => x !== null));
        setVehicles(v.filter((x): x is Vehicle => x !== null));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!person) return <ErrorMessage message="Character not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/people" className="text-yellow-400 hover:text-yellow-300 mb-6 inline-block">
        &larr; Back to Characters
      </Link>

      <div className="bg-gray-900/80 border border-yellow-400/30 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">{person.name}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Physical Attributes</h2>
            <DetailRow label="Height" value={person.height !== 'unknown' ? `${person.height} cm` : 'Unknown'} />
            <DetailRow label="Mass" value={person.mass !== 'unknown' ? `${person.mass} kg` : 'Unknown'} />
            <DetailRow label="Hair Color" value={person.hair_color} />
            <DetailRow label="Skin Color" value={person.skin_color} />
            <DetailRow label="Eye Color" value={person.eye_color} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Background</h2>
            <DetailRow label="Birth Year" value={person.birth_year} />
            <DetailRow label="Gender" value={person.gender} />
            <DetailRow label="Homeworld" value={homeworld?.name || 'Unknown'} />
            <DetailRow label="Species" value={species.map((s) => s.name).join(', ') || 'Human'} />
          </div>
        </div>

        {films.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Films</h2>
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

        {starships.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Starships</h2>
            <div className="flex flex-wrap gap-2">
              {starships.map((ship) => (
                <Link
                  key={ship.url}
                  to={`/starships/${extractIdFromUrl(ship.url)}`}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                >
                  {ship.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {vehicles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Vehicles</h2>
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
      </div>
    </div>
  );
}
