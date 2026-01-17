import type { Person, Planet, Film, Species, Starship, Vehicle, ResourceType } from '../types';
import { localFilms, getLocalFilm } from '../data/films';

const BASE_URL = 'https://swapi.info/api';

// Simple in-memory cache with TTL
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedData<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  // Check if cache entry is still valid
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

async function fetchData<T>(endpoint: string): Promise<T> {
  const cacheKey = `${BASE_URL}${endpoint}`;

  // Check cache first
  const cached = getCachedData<T>(cacheKey);
  if (cached !== null) {
    return cached;
  }

  // Fetch from API
  const response = await fetch(cacheKey);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  // Store in cache
  setCachedData(cacheKey, data);

  return data;
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

// Helper to fetch any resource by URL (with caching)
export async function fetchByUrl<T>(url: string): Promise<T> {
  // Check cache first
  const cached = getCachedData<T>(url);
  if (cached !== null) {
    return cached;
  }

  // Fetch from API
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  // Store in cache
  setCachedData(url, data);

  return data;
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
