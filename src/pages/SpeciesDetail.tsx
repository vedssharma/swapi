import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpeciesById, fetchByUrl, extractIdFromUrl } from '../services/api';
import { Loader, ErrorMessage, DetailRow } from '../components';
import type { Species, Person, Film, Planet } from '../types';

export function SpeciesDetail() {
  const { id } = useParams<{ id: string }>();
  const [species, setSpecies] = useState<Species | null>(null);
  const [homeworld, setHomeworld] = useState<Planet | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getSpeciesById(id)
      .then(async (data) => {
        setSpecies(data);

        const [hw, p, f] = await Promise.all([
          data.homeworld ? fetchByUrl<Planet>(data.homeworld).catch(() => null) : null,
          Promise.all(data.people.map((url) => fetchByUrl<Person>(url).catch(() => null))),
          Promise.all(data.films.map((url) => fetchByUrl<Film>(url).catch(() => null))),
        ]);

        setHomeworld(hw);
        setPeople(p.filter((x): x is Person => x !== null));
        setFilms(f.filter((x): x is Film => x !== null));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!species) return <ErrorMessage message="Species not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/species" className="text-yellow-400 hover:text-yellow-300 mb-6 inline-block">
        &larr; Back to Species
      </Link>

      <div className="bg-gray-900/80 border border-yellow-400/30 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">{species.name}</h1>
        <p className="text-gray-400 text-lg mb-6">{species.classification} - {species.designation}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Physical Traits</h2>
            <DetailRow label="Average Height" value={species.average_height !== 'unknown' ? `${species.average_height} cm` : 'Unknown'} />
            <DetailRow label="Average Lifespan" value={species.average_lifespan !== 'unknown' ? `${species.average_lifespan} years` : 'Unknown'} />
            <DetailRow label="Skin Colors" value={species.skin_colors} />
            <DetailRow label="Hair Colors" value={species.hair_colors} />
            <DetailRow label="Eye Colors" value={species.eye_colors} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Culture</h2>
            <DetailRow label="Language" value={species.language} />
            <DetailRow label="Homeworld" value={homeworld?.name || 'Unknown'} />
          </div>
        </div>

        {people.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Notable Members</h2>
            <div className="flex flex-wrap gap-2">
              {people.map((person) => (
                <Link
                  key={person.url}
                  to={`/people/${extractIdFromUrl(person.url)}`}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors"
                >
                  {person.name}
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
  );
}
