import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllResourcesForSearch } from '../services/api';
import type { SearchResult } from '../services/api';
import type { ResourceType } from '../types';

const typeLabels: Record<ResourceType, string> = {
  people: 'Character',
  planets: 'Planet',
  starships: 'Starship',
  vehicles: 'Vehicle',
  species: 'Species',
  films: 'Film',
};

const typeIcons: Record<ResourceType, string> = {
  people: '👤',
  planets: '🪐',
  starships: '🚀',
  vehicles: '🚗',
  species: '👽',
  films: '🎬',
};

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [allResults, setAllResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasLoadedRef = useRef(false);
  const navigate = useNavigate();

  // Debounce the query input with 200ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Optimize string operations by calculating toLowerCase once
  const suggestions = useMemo(() => {
    if (debouncedQuery.trim().length === 0) return [];
    const lowerQuery = debouncedQuery.toLowerCase(); // Calculate once
    return allResults
      .filter((item) => item.name.toLowerCase().includes(lowerQuery))
      .slice(0, 8);
  }, [debouncedQuery, allResults]);

  // Function to load search data on demand
  const loadSearchData = () => {
    if (!hasLoadedRef.current && !isLoading) {
      hasLoadedRef.current = true;
      setIsLoading(true);
      getAllResourcesForSearch()
        .then(setAllResults)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(result: SearchResult) {
    navigate(`/${result.type}/${result.id}`);
    setQuery('');
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            setSelectedIndex(-1);
            setIsOpen(value.trim().length > 0);
            loadSearchData();
          }}
          onFocus={() => {
            loadSearchData();
            if (query.trim() && suggestions.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? 'Loading search data...' : 'Search the galaxy...'}
          className="w-full px-5 py-3 pl-12 bg-gray-900/80 border border-yellow-400/30 rounded-full text-gray-100 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all disabled:opacity-50"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-yellow-400/30 rounded-lg shadow-lg shadow-black/50 overflow-hidden">
          {suggestions.map((result, index) => (
            <button
              key={`${result.type}-${result.id}`}
              onClick={() => handleSelect(result)}
              className={`w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-yellow-400/10 transition-colors ${
                index === selectedIndex ? 'bg-yellow-400/10' : ''
              }`}
            >
              <span className="text-xl">{typeIcons[result.type]}</span>
              <div className="flex-1 min-w-0">
                <div className="text-gray-100 truncate">{result.name}</div>
                <div className="text-xs text-gray-500">{typeLabels[result.type]}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
