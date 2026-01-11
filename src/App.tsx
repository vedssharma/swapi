import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components';
import {
  Home,
  People,
  PersonDetail,
  Planets,
  PlanetDetail,
  Starships,
  StarshipDetail,
  Vehicles,
  VehicleDetail,
  Species,
  SpeciesDetail,
  Films,
  FilmDetail,
} from './pages';

function App() {
  return (
    <div className="min-h-screen text-gray-100">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:id" element={<PersonDetail />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/planets/:id" element={<PlanetDetail />} />
          <Route path="/starships" element={<Starships />} />
          <Route path="/starships/:id" element={<StarshipDetail />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/species" element={<Species />} />
          <Route path="/species/:id" element={<SpeciesDetail />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<FilmDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
