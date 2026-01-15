import type { Film } from '../types';

export const localFilms: Film[] = [
  {
    title: 'The Force Awakens',
    episode_id: 7,
    opening_crawl:
      'Luke Skywalker has vanished. In his absence, the sinister FIRST ORDER has risen from the ashes of the Empire and will not rest until Skywalker, the last Jedi, has been destroyed.\n\nWith the support of the REPUBLIC, General Leia Organa leads a brave RESISTANCE. She is desperate to find her brother Luke and gain his help in restoring peace and justice to the galaxy.\n\nLeia has sent her most daring pilot on a secret mission to Jakku, where an old ally has discovered a clue to Luke\'s whereabouts....',
    director: 'J.J. Abrams',
    producer: 'Kathleen Kennedy, J.J. Abrams, Bryan Burk',
    release_date: '2015-12-18',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '2015-12-18T00:00:00.000Z',
    edited: '2015-12-18T00:00:00.000Z',
    url: 'https://swapi.info/api/films/7',
  },
  {
    title: 'The Last Jedi',
    episode_id: 8,
    opening_crawl:
      'The FIRST ORDER reigns. Having decimated the peaceful Republic, Supreme Leader Snoke now deploys his merciless legions to seize military control of the galaxy.\n\nOnly General Leia Organa\'s band of RESISTANCE fighters stand against the rising tyranny, certain that Jedi Master Luke Skywalker will return and restore a spark of hope to the fight.\n\nBut the Resistance has been exposed. As the First Order speeds toward the rebel base, the brave heroes mount a desperate escape....',
    director: 'Rian Johnson',
    producer: 'Kathleen Kennedy, Ram Bergman',
    release_date: '2017-12-15',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '2017-12-15T00:00:00.000Z',
    edited: '2017-12-15T00:00:00.000Z',
    url: 'https://swapi.info/api/films/8',
  },
  {
    title: 'The Rise of Skywalker',
    episode_id: 9,
    opening_crawl:
      'The dead speak! The galaxy has heard a mysterious broadcast, a threat of REVENGE in the sinister voice of the late EMPEROR PALPATINE.\n\nGENERAL LEIA ORGANA dispatches secret agents to gather intelligence, while REY, the last hope of the Jedi, trains for battle against the diabolical FIRST ORDER.\n\nMeanwhile, Supreme Leader KYLO REN rages in search of the phantom Emperor, determined to destroy any threat to his power....',
    director: 'J.J. Abrams',
    producer: 'Kathleen Kennedy, J.J. Abrams, Michelle Rejwan',
    release_date: '2019-12-20',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '2019-12-20T00:00:00.000Z',
    edited: '2019-12-20T00:00:00.000Z',
    url: 'https://swapi.info/api/films/9',
  },
  {
    title: 'Rogue One: A Star Wars Story',
    // No episode_id - this is a standalone film
    opening_crawl:
      'A long time ago in a galaxy far, far away....\n\nIt is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.\n\nDuring the battle, Rebel spies managed to steal secret plans to the Empire\'s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.\n\nPursued by the Empire\'s sinister agents, a ragtag group of rebels embark on a daring mission to steal the Death Star plans....',
    director: 'Gareth Edwards',
    producer: 'Kathleen Kennedy, Allison Shearmur, Simon Emanuel',
    release_date: '2016-12-16',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '2016-12-16T00:00:00.000Z',
    edited: '2016-12-16T00:00:00.000Z',
    url: 'https://swapi.info/api/films/10',
  },
];

export function getLocalFilm(id: string): Film | undefined {
  return localFilms.find((film) => film.url.endsWith(`/films/${id}`));
}
