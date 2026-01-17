import { useEffect, useState, useMemo } from 'react';
import { getPeople, extractIdFromUrl } from '../services/api';
import { getPersonImage } from '../services/images';
import { Card, Loader, PageHeader, ErrorMessage } from '../components';
import type { Person } from '../types';

export function People() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Memoize people with pre-computed IDs and card props to prevent re-computation on re-renders
  const peopleWithDetails = useMemo(() => {
    return people.map((person) => {
      const id = extractIdFromUrl(person.url);
      return {
        key: person.url,
        title: person.name,
        subtitle: person.gender !== 'n/a' ? person.gender : undefined,
        details: [
          { label: 'Birth Year', value: person.birth_year },
          { label: 'Height', value: person.height !== 'unknown' ? `${person.height} cm` : 'Unknown' },
          { label: 'Mass', value: person.mass !== 'unknown' ? `${person.mass} kg` : 'Unknown' },
        ],
        linkTo: `/people/${id}`,
        imageUrl: getPersonImage(id),
      };
    });
  }, [people]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="Characters"
        subtitle="Heroes, villains, and everyone in between"
        count={people.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {peopleWithDetails.map(({ key, ...props }) => (
          <Card key={key} {...props} />
        ))}
      </div>
    </div>
  );
}
