import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/people', label: 'Characters' },
  { path: '/planets', label: 'Planets' },
  { path: '/starships', label: 'Starships' },
  { path: '/vehicles', label: 'Vehicles' },
  { path: '/species', label: 'Species' },
  { path: '/films', label: 'Films' },
];

export function Navigation() {
  return (
    <nav className="bg-black/90 border-b border-yellow-400/30 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-yellow-400 font-bold text-xl tracking-wider">
            SWAPI Explorer
          </NavLink>
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
