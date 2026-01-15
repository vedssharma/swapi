import type { Person, Planet, Film, Species, Starship, Vehicle, ResourceType } from '../types';
import { localFilms, getLocalFilm } from '../data/films';

const BASE_URL = 'https://swapi.info/api';

async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getPeople(): Promise<Person[]> {
  return fetchData<Person[]>('/people');
}

export async function getPerson(id: string): Promise<Person> {
  return fetchData<Person>(`/people/${id}`);
}

export async function getPlanets(): Promise<Planet[]> {
  return fetchData<Planet[]>('/planets');
}

export async function getPlanet(id: string): Promise<Planet> {
  return fetchData<Planet>(`/planets/${id}`);
}

export async function getFilms(): Promise<Film[]> {
  const swapiFilms = await fetchData<Film[]>('/films');
  return [...swapiFilms, ...localFilms];
}

export async function getFilm(id: string): Promise<Film> {
  const localFilm = getLocalFilm(id);
  if (localFilm) {
    return localFilm;
  }
  return fetchData<Film>(`/films/${id}`);
}

export async function getSpecies(): Promise<Species[]> {
  return fetchData<Species[]>('/species');
}

export async function getSpeciesById(id: string): Promise<Species> {
  return fetchData<Species>(`/species/${id}`);
}

export async function getStarships(): Promise<Starship[]> {
  return fetchData<Starship[]>('/starships');
}

export async function getStarship(id: string): Promise<Starship> {
  return fetchData<Starship>(`/starships/${id}`);
}

export async function getVehicles(): Promise<Vehicle[]> {
  return fetchData<Vehicle[]>('/vehicles');
}

export async function getVehicle(id: string): Promise<Vehicle> {
  return fetchData<Vehicle>(`/vehicles/${id}`);
}

// Helper to extract ID from URL
export function extractIdFromUrl(url: string): string {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
}

// Helper to fetch any resource by URL
export async function fetchByUrl<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Get resource type from URL
export function getResourceTypeFromUrl(url: string): ResourceType {
  const match = url.match(/\/api\/(\w+)\//);
  return (match?.[1] || 'people') as ResourceType;
}

export interface SearchResult {
  name: string;
  type: ResourceType;
  id: string;
}

// Fetch all resources for search
export async function getAllResourcesForSearch(): Promise<SearchResult[]> {
  const [people, planets, starships, vehicles, species, films] = await Promise.all([
    getPeople(),
    getPlanets(),
    getStarships(),
    getVehicles(),
    getSpecies(),
    getFilms(),
  ]);

  const results: SearchResult[] = [];

  people.forEach((p) => results.push({ name: p.name, type: 'people', id: extractIdFromUrl(p.url) }));
  planets.forEach((p) => results.push({ name: p.name, type: 'planets', id: extractIdFromUrl(p.url) }));
  starships.forEach((s) => results.push({ name: s.name, type: 'starships', id: extractIdFromUrl(s.url) }));
  vehicles.forEach((v) => results.push({ name: v.name, type: 'vehicles', id: extractIdFromUrl(v.url) }));
  species.forEach((s) => results.push({ name: s.name, type: 'species', id: extractIdFromUrl(s.url) }));
  films.forEach((f) => results.push({ name: f.title, type: 'films', id: extractIdFromUrl(f.url) }));

  return results;
}
