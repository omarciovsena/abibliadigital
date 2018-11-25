const books = [
  {
    name: 'Gênesis',
    abbrev: 'gn',
    testament: 'VT',
    chapters: 50,
    author: 'Moisés',
    comment: '',
    group: 'Pentateuco'
  },
  {
    name: 'Êxodo',
    abbrev: 'ex',
    testament: 'VT',
    chapters: 40,
    author: 'Moisés',
    comment: '',
    group: 'Pentateuco'
  },
  {
    name: 'Levítico',
    abbrev: 'lv',
    testament: 'VT',
    chapters: 27,
    author: 'Moisés',
    comment: '',
    group: 'Pentateuco'
  },
  {
    name: 'Números',
    abbrev: 'nm',
    testament: 'VT',
    chapters: 36,
    author: 'Moisés',
    comment: '',
    group: 'Pentateuco'
  },
  {
    name: 'Deuteronômio',
    abbrev: 'dt',
    testament: 'VT',
    chapters: 34,
    author: 'Moisés',
    comment: '',
    group: 'Pentateuco'
  },
  {
    name: 'Josué',
    abbrev: 'js',
    testament: 'VT',
    chapters: 24,
    author: 'Josué',
    comment: '',
    group: 'Históricos'
  },
  {
    name: 'Juízes',
    abbrev: 'jz',
    testament: 'VT',
    chapters: 21,
    author: 'Samuel',
    comment: '',
    group: 'Históricos'
  },
  {
    name: 'Rute',
    abbrev: 'rt',
    testament: 'VT',
    chapters: 4,
    author: 'Samuel',
    comment: '',
    group: 'Históricos'
  },
  {
    name: '1º Samuel',
    abbrev: '1sm',
    testament: 'VT',
    chapters: 31,
    author: 'Samuel',
    comment: '',
    group: 'Históricos'
  },
  {
    name: '2º Samuel',
    abbrev: '2sm',
    testament: 'VT',
    chapters: 24,
    author: 'Samuel',
    comment: '',
    group: 'Históricos'
  },
  {
    name: '1º Reis',
    abbrev: '1rs',
    testament: 'VT',
    chapters: 22,
    author: 'Jeremias',
    comment: '',
    group: 'Históricos'
  },
  {
    name: '2º Reis',
    abbrev: '2rs',
    testament: 'VT',
    chapters: 25,
    author: 'Jeremias',
    comment: '',
    group: 'Históricos'
  },
  {
    name: '1º Crônicas',
    abbrev: '1cr',
    testament: 'VT',
    chapters: 29,
    author: 'Esdras',
    comment: '',
    group: 'Históricos'
  },
  {
    name: '2º Crônicas',
    abbrev: '2cr',
    testament: 'VT',
    chapters: 36,
    author: 'Esdras',
    comment: '',
    group: 'Históricos'
  },
  {
    name: 'Esdras',
    abbrev: 'ed',
    testament: 'VT',
    chapters: 10,
    author: 'Esdras',
    comment: '',
    group: 'Históricos'
  },
  {
    name: 'Neemias',
    abbrev: 'ne',
    testament: 'VT',
    chapters: 13,
    author: 'Neemias',
    comment: '',
    group: 'Históricos'
  },
  {
    name: 'Ester',
    abbrev: 'et',
    testament: 'VT',
    chapters: 10,
    author: '',
    comment: '',
    group: 'Históricos'
  },
  {
    name: 'Jó',
    abbrev: 'jó',
    testament: 'VT',
    chapters: 42,
    author: '',
    comment: '',
    group: 'Poéticos'
  },
  {
    name: 'Salmos',
    abbrev: 'sl',
    testament: 'VT',
    chapters: 150,
    author: 'David, Moisés, Salomão',
    comment: '',
    group: 'Poéticos'
  },
  {
    name: 'Provérbios',
    abbrev: 'pv',
    testament: 'VT',
    chapters: 31,
    author: 'Salomão',
    comment: '',
    group: 'Poéticos'
  },
  {
    name: 'Eclesiastes',
    abbrev: 'ec',
    testament: 'VT',
    chapters: 12,
    author: 'Salomão',
    comment: '',
    group: 'Poéticos'
  },
  {
    name: 'Cânticos',
    abbrev: 'ct',
    testament: 'VT',
    chapters: 8,
    author: 'Salomão',
    comment: '',
    group: 'Poéticos'
  },
  {
    name: 'Isaías',
    abbrev: 'is',
    testament: 'VT',
    chapters: 66,
    author: 'Isaías',
    comment: '',
    group: 'Profetas maiores'
  },
  {
    name: 'Jeremias',
    abbrev: 'rr',
    testament: 'VT',
    chapters: 52,
    author: 'Jeremias',
    comment: '',
    group: 'Profetas maiores'
  },
  {
    name: 'Lamentações de Jeremias',
    abbrev: 'lm',
    testament: 'VT',
    chapters: 5,
    author: 'Jeremias',
    comment: '',
    group: 'Profetas maiores'
  },
  {
    name: 'Ezequiel',
    abbrev: 'ez',
    testament: 'VT',
    chapters: 48,
    author: 'Ezequiel',
    comment: '',
    group: 'Profetas maiores'
  },
  {
    name: 'Daniel',
    abbrev: 'dn',
    testament: 'VT',
    chapters: 12,
    author: 'Daniel',
    comment: '',
    group: 'Profetas maiores'
  },
  {
    name: 'Oséias',
    abbrev: 'os',
    testament: 'VT',
    chapters: 14,
    author: 'Oséias',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Joel',
    abbrev: 'jl',
    testament: 'VT',
    chapters: 3,
    author: 'Joel',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Amós',
    abbrev: 'am',
    testament: 'VT',
    chapters: 9,
    author: 'Amós',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Obadias',
    abbrev: 'ob',
    testament: 'VT',
    chapters: 1,
    author: 'Obadias',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Jonas',
    abbrev: 'jn',
    testament: 'VT',
    chapters: 4,
    author: 'Jonas',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Miquéias',
    abbrev: 'mq',
    testament: 'VT',
    chapters: 7,
    author: 'Miquéias',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Naum',
    abbrev: 'na',
    testament: 'VT',
    chapters: 3,
    author: 'Naum',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Habacuque',
    abbrev: 'hc',
    testament: 'VT',
    chapters: 3,
    author: 'Habacuque',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Sofonias',
    abbrev: 'sf',
    testament: 'VT',
    chapters: 3,
    author: 'Sofonias',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Ageu',
    abbrev: 'ag',
    testament: 'VT',
    chapters: 2,
    author: 'Ageu',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Zacarias',
    abbrev: 'zc',
    testament: 'VT',
    chapters: 14,
    author: 'Zacarias',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Malaquias',
    abbrev: 'ml',
    testament: 'VT',
    chapters: 4,
    author: 'Malaquias',
    comment: '',
    group: 'Profetas menores'
  },
  {
    name: 'Mateus',
    abbrev: 'mt',
    testament: 'NT',
    chapters: 28,
    author: 'Mateus',
    comment: '',
    group: 'Evangelhos'
  },
  {
    name: 'Marcos',
    abbrev: 'mc',
    testament: 'NT',
    chapters: 16,
    author: 'Marcos',
    comment: '',
    group: 'Evangelhos'
  },
  {
    name: 'Lucas',
    abbrev: 'lc',
    testament: 'NT',
    chapters: 24,
    author: 'Lucas',
    comment: '',
    group: 'Evangelhos'
  },
  {
    name: 'João',
    abbrev: 'jo',
    testament: 'NT',
    chapters: 21,
    author: 'João',
    comment: '',
    group: 'Evangelhos'
  },
  {
    name: 'Atos',
    abbrev: 'at',
    testament: 'NT',
    chapters: 28,
    author: 'Lucas',
    comment: '',
    group: 'Histórico'
  },
  {
    name: 'Romanos',
    abbrev: 'rm',
    testament: 'NT',
    chapters: 16,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '1ª Coríntios',
    abbrev: '1co',
    testament: 'NT',
    chapters: 16,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '2ª Coríntios',
    abbrev: '2co',
    testament: 'NT',
    chapters: 13,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Gálatas',
    abbrev: 'gl',
    testament: 'NT',
    chapters: 6,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Efésios',
    abbrev: 'ef',
    testament: 'NT',
    chapters: 6,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Filipenses',
    abbrev: 'fp',
    testament: 'NT',
    chapters: 4,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Colossenses',
    abbrev: 'cl',
    testament: 'NT',
    chapters: 4,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '1ª Tessalonicenses',
    abbrev: '1ts',
    testament: 'NT',
    chapters: 5,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '2ª Tessalonicenses',
    abbrev: '2ts',
    testament: 'NT',
    chapters: 3,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '1ª Timóteo',
    abbrev: '1tm',
    testament: 'NT',
    chapters: 6,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '2ª Timóteo',
    abbrev: '2tm',
    testament: 'NT',
    chapters: 4,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Tito',
    abbrev: 'tt',
    testament: 'NT',
    chapters: 2,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Filemom',
    abbrev: 'fm',
    testament: 'NT',
    chapters: 4,
    author: 'Paulo',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Hebreus',
    abbrev: 'hb',
    testament: 'NT',
    chapters: 13,
    author: 'Desconhecido',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Tiago',
    abbrev: 'tg',
    testament: 'NT',
    chapters: 5,
    author: 'Tiago',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '1ª Pedro',
    abbrev: '1pe',
    testament: 'NT',
    chapters: 5,
    author: 'Pedro',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '2ª Pedro',
    abbrev: '2pe',
    testament: 'NT',
    chapters: 3,
    author: 'Pedro',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '1ª João',
    abbrev: '1jo',
    testament: 'NT',
    chapters: 5,
    author: 'João',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '2ª João',
    abbrev: '2jo',
    testament: 'NT',
    chapters: 1,
    author: 'João',
    comment: '',
    group: 'Cartas'
  },
  {
    name: '3ª João',
    abbrev: '3jo',
    testament: 'NT',
    chapters: 1,
    author: 'João',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Judas',
    abbrev: 'jd',
    testament: 'NT',
    chapters: 1,
    author: 'Judas',
    comment: '',
    group: 'Cartas'
  },
  {
    name: 'Apocalipse',
    abbrev: 'ap',
    testament: 'NT',
    chapters: 22,
    author: 'João',
    comment: '',
    group: 'Revelações'
  }
]

module.exports = books
