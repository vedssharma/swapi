import { useEffect, useState } from 'react';
import { getVehicles, extractIdFromUrl } from '../services/api';
import { Card, Loader, PageHeader, ErrorMessage } from '../components';
import type { Vehicle } from '../types';

export function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getVehicles()
      .then(setVehicles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="Vehicles"
        subtitle="Ground and atmospheric transports"
        count={vehicles.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.url}
            title={vehicle.name}
            subtitle={vehicle.vehicle_class}
            details={[
              { label: 'Manufacturer', value: vehicle.manufacturer },
              { label: 'Model', value: vehicle.model },
              { label: 'Max Speed', value: vehicle.max_atmosphering_speed !== 'unknown' ? `${vehicle.max_atmosphering_speed} km/h` : 'Unknown' },
            ]}
            linkTo={`/vehicles/${extractIdFromUrl(vehicle.url)}`}
          />
        ))}
      </div>
    </div>
  );
}
