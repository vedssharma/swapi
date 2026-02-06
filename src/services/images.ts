const BASE_URL = 'https://starwars-visualguide.com/assets/img';

// Placeholder SVG data URIs for each category
const PLACEHOLDERS = {
  person: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231a1a2e' width='100' height='100'/%3E%3Ccircle cx='50' cy='35' r='18' fill='%23FFE81F' opacity='0.3'/%3E%3Cpath d='M25 85 Q25 55 50 55 Q75 55 75 85' fill='%23FFE81F' opacity='0.3'/%3E%3C/svg%3E",
  planet: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231a1a2e' width='100' height='100'/%3E%3Ccircle cx='50' cy='50' r='35' fill='%23FFE81F' opacity='0.3'/%3E%3Cellipse cx='50' cy='50' rx='45' ry='10' fill='none' stroke='%23FFE81F' opacity='0.2' stroke-width='2'/%3E%3C/svg%3E",
  starship: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231a1a2e' width='100' height='100'/%3E%3Cpath d='M50 15 L75 70 L50 60 L25 70 Z' fill='%23FFE81F' opacity='0.3'/%3E%3Crect x='45' y='60' width='10' height='25' fill='%23FFE81F' opacity='0.3'/%3E%3C/svg%3E",
  vehicle: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231a1a2e' width='100' height='100'/%3E%3Crect x='15' y='40' width='70' height='25' rx='5' fill='%23FFE81F' opacity='0.3'/%3E%3Ccircle cx='30' cy='70' r='10' fill='%23FFE81F' opacity='0.3'/%3E%3Ccircle cx='70' cy='70' r='10' fill='%23FFE81F' opacity='0.3'/%3E%3C/svg%3E",
  species: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231a1a2e' width='100' height='100'/%3E%3Ccircle cx='35' cy='40' r='15' fill='%23FFE81F' opacity='0.3'/%3E%3Ccircle cx='65' cy='40' r='15' fill='%23FFE81F' opacity='0.3'/%3E%3Ccircle cx='50' cy='65' r='15' fill='%23FFE81F' opacity='0.3'/%3E%3C/svg%3E",
  film: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231a1a2e' width='100' height='100'/%3E%3Crect x='20' y='20' width='60' height='60' rx='5' fill='%23FFE81F' opacity='0.3'/%3E%3Cpolygon points='45,35 45,65 65,50' fill='%231a1a2e'/%3E%3C/svg%3E",
};

export function getPersonImage(id: string): string {
  if (!id) return PLACEHOLDERS.person;
  return `${BASE_URL}/characters/${id}.jpg`;
}

export function getPlanetImage(id: string): string {
  if (!id) return PLACEHOLDERS.planet;
  return `${BASE_URL}/planets/${id}.jpg`;
}

export function getStarshipImage(id: string): string {
  if (!id) return PLACEHOLDERS.starship;
  return `${BASE_URL}/starships/${id}.jpg`;
}

export function getVehicleImage(id: string): string {
  if (!id) return PLACEHOLDERS.vehicle;
  return `${BASE_URL}/vehicles/${id}.jpg`;
}

export function getSpeciesImage(id: string): string {
  if (!id) return PLACEHOLDERS.species;
  return `${BASE_URL}/species/${id}.jpg`;
}

export function getFilmImage(id: string): string {
  if (!id) return PLACEHOLDERS.film;
  return `${BASE_URL}/films/${id}.jpg`;
}

// Get image by resource type and ID
export function getResourceImage(type: string, id: string): string {
  switch (type) {
    case 'people':
      return getPersonImage(id);
    case 'planets':
      return getPlanetImage(id);
    case 'starships':
      return getStarshipImage(id);
    case 'vehicles':
      return getVehicleImage(id);
    case 'species':
      return getSpeciesImage(id);
    case 'films':
      return getFilmImage(id);
    default:
      return PLACEHOLDERS.person;
  }
}
