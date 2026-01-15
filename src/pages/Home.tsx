import { Link } from 'react-router-dom';
import { SearchBar } from '../components';

const categories = [
  {
    name: 'Characters',
    path: '/people',
    description: 'Heroes, villains, and everyone in between',
    icon: '👤',
  },
  {
    name: 'Planets',
    path: '/planets',
    description: 'Worlds across the galaxy far, far away',
    icon: '🪐',
  },
  {
    name: 'Starships',
    path: '/starships',
    description: 'Ships that travel through hyperspace',
    icon: '🚀',
  },
  {
    name: 'Vehicles',
    path: '/vehicles',
    description: 'Ground and atmospheric transports',
    icon: '🚗',
  },
  {
    name: 'Species',
    path: '/species',
    description: 'Sentient beings from across the galaxy',
    icon: '👽',
  },
  {
    name: 'Films',
    path: '/films',
    description: 'The complete Star Wars saga',
    icon: '🎬',
  },
];

export function Home() {
  return (
    <div className="text-center">
      <div className="py-12">
        <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 tracking-wider mb-4">
          STAR WARS
        </h1>
        <p className="text-xl text-gray-400 mb-2">API Explorer</p>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore the Star Wars universe. Browse characters, planets, starships,
          vehicles, species, and films from the Star Wars saga.
        </p>
      </div>

      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.path}
            to={category.path}
            className="group bg-gray-900/80 border border-yellow-400/20 rounded-lg p-8 hover:border-yellow-400/60 hover:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/10"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <h2 className="text-yellow-400 font-bold text-2xl mb-2">
              {category.name}
            </h2>
            <p className="text-gray-400 text-sm">{category.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-gray-600 text-sm">
        <p>Powered by <a href="https://swapi.info" target="_blank" rel="noopener noreferrer" className="text-yellow-400/60 hover:text-yellow-400">SWAPI</a></p>
      </div>
    </div>
  );
}
