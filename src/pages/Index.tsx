import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  evolution?: {
    from?: string;
    to?: string;
    level?: number;
  };
}

const pokemonData: Pokemon[] = [
  {
    id: 1,
    name: 'Бульбазавр',
    types: ['Трава', 'Яд'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    evolution: { to: 'Ивизавр', level: 16 }
  },
  {
    id: 2,
    name: 'Ивизавр',
    types: ['Трава', 'Яд'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    evolution: { from: 'Бульбазавр', to: 'Венузавр', level: 32 }
  },
  {
    id: 3,
    name: 'Венузавр',
    types: ['Трава', 'Яд'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
    evolution: { from: 'Ивизавр' }
  },
  {
    id: 4,
    name: 'Чармандер',
    types: ['Огонь'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    evolution: { to: 'Чармелеон', level: 16 }
  },
  {
    id: 5,
    name: 'Чармелеон',
    types: ['Огонь'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
    evolution: { from: 'Чармандер', to: 'Чаризард', level: 36 }
  },
  {
    id: 6,
    name: 'Чаризард',
    types: ['Огонь', 'Полет'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    evolution: { from: 'Чармелеон' }
  },
  {
    id: 7,
    name: 'Сквиртл',
    types: ['Вода'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    evolution: { to: 'Вартортл', level: 16 }
  },
  {
    id: 8,
    name: 'Вартортл',
    types: ['Вода'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
    evolution: { from: 'Сквиртл', to: 'Бластойз', level: 36 }
  },
  {
    id: 9,
    name: 'Бластойз',
    types: ['Вода'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
    evolution: { from: 'Вартортл' }
  },
  {
    id: 25,
    name: 'Пикачу',
    types: ['Электро'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    evolution: { from: 'Пичу', to: 'Райчу' }
  },
  {
    id: 133,
    name: 'Иви',
    types: ['Нормал'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    evolution: { to: 'Вапореон/Джолтеон/Флареон' }
  },
  {
    id: 150,
    name: 'Мьюту',
    types: ['Психо'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
  }
];

const typeColors: Record<string, string> = {
  'Трава': 'bg-green-500',
  'Яд': 'bg-purple-500',
  'Огонь': 'bg-red-500',
  'Вода': 'bg-blue-500',
  'Электро': 'bg-yellow-500',
  'Полет': 'bg-sky-400',
  'Нормал': 'bg-gray-400',
  'Психо': 'bg-pink-500'
};

const Index = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredPokemon = pokemonData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = !selectedType || p.types.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const evolutionChains = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const allTypes = Array.from(new Set(pokemonData.flatMap(p => p.types)));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-6xl font-bold text-primary mb-2">
            Покедекс
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Исследуй мир покемонов и их эволюции. Узнай о типах, способностях и особенностях каждого существа из вселенной Покемон.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">📚</div>
                <h3 className="font-bold text-lg">12 Покемонов</h3>
                <p className="text-sm text-muted-foreground">В нашей базе данных</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">🔄</div>
                <h3 className="font-bold text-lg">3 Цепочки</h3>
                <p className="text-sm text-muted-foreground">Эволюционных линий</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-bold text-lg">8 Типов</h3>
                <p className="text-sm text-muted-foreground">Различных элементов</p>
              </CardContent>
            </Card>
          </div>
        </header>

        <Tabs defaultValue="pokedex" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pokedex" className="text-lg">
              <Icon name="BookOpen" className="mr-2" size={20} />
              Покедекс
            </TabsTrigger>
            <TabsTrigger value="evolutions" className="text-lg">
              <Icon name="GitBranch" className="mr-2" size={20} />
              Эволюции
            </TabsTrigger>
            <TabsTrigger value="search" className="text-lg">
              <Icon name="Search" className="mr-2" size={20} />
              Поиск
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pokedex" className="space-y-8">
            <Card className="border-2 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-3">Что такое Покедекс?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Покедекс — это энциклопедия покемонов, содержащая информацию о каждом существе. 
                  Здесь ты найдешь данные о типах покемонов, их способностях и эволюционных цепочках. 
                  Каждый покемон уникален и обладает своими сильными сторонами в бою.
                </p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pokemonData.map((pokemon) => (
                <Card 
                  key={pokemon.id} 
                  className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-full h-48 flex items-center justify-center mb-4">
                      <img 
                        src={pokemon.image} 
                        alt={pokemon.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground font-semibold">
                        #{pokemon.id.toString().padStart(3, '0')}
                      </div>
                      <h3 className="text-2xl font-bold">{pokemon.name}</h3>
                      <div className="flex gap-2 justify-center flex-wrap">
                        {pokemon.types.map((type) => (
                          <Badge
                            key={type}
                            className={`${typeColors[type]} text-white border-0`}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evolutions" className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Цепочки эволюции</h2>
              <p className="text-muted-foreground mb-6">
                Узнай, как покемоны развиваются и становятся сильнее
              </p>
              <Card className="border-2 bg-gradient-to-r from-accent/10 to-primary/5 max-w-3xl mx-auto">
                <CardContent className="p-6 text-left">
                  <h3 className="font-bold text-lg mb-3">Как работает эволюция?</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Уровень:</strong> Большинство покемонов эволюционируют при достижении определенного уровня. 
                      Например, Чармандер становится Чармелеоном на 16 уровне.
                    </p>
                    <p>
                      <strong className="text-foreground">Развитие:</strong> После эволюции покемон получает улучшенные характеристики, 
                      новые способности и может изменить свой тип.
                    </p>
                    <p>
                      <strong className="text-foreground">Финальная форма:</strong> Последняя стадия эволюции обычно самая мощная 
                      и не может эволюционировать дальше.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {evolutionChains.map((chain, idx) => {
              const chainPokemon = chain.map(id => pokemonData.find(p => p.id === id)!);
              
              return (
                <Card key={idx} className="p-8 border-2 bg-gradient-to-br from-background to-muted/20">
                  <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
                    {chainPokemon.map((pokemon, i) => (
                      <div key={pokemon.id} className="flex items-center gap-4 md:gap-8">
                        <div className="group relative">
                          <Card className="hover:shadow-2xl transition-all duration-500 hover:scale-110 border-2">
                            <CardContent className="p-6 text-center space-y-3 min-w-[180px]">
                              <div className="w-full h-32 flex items-center justify-center mb-2">
                                <img 
                                  src={pokemon.image} 
                                  alt={pokemon.name}
                                  className="w-full h-full object-contain transform group-hover:scale-125 transition-transform duration-500"
                                />
                              </div>
                              <div className="text-sm text-muted-foreground font-semibold">
                                #{pokemon.id.toString().padStart(3, '0')}
                              </div>
                              <h3 className="text-xl font-bold">{pokemon.name}</h3>
                              <div className="flex gap-2 justify-center flex-wrap">
                                {pokemon.types.map((type) => (
                                  <Badge
                                    key={type}
                                    className={`${typeColors[type]} text-white border-0 text-xs`}
                                  >
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {i < chainPokemon.length - 1 && (
                          <div className="hidden md:flex flex-col items-center gap-2 relative">
                            <Icon 
                              name="ArrowRight" 
                              size={40} 
                              className="text-primary animate-pulse"
                            />
                            {pokemon.evolution?.level && (
                              <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                                Ур. {pokemon.evolution.level}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="border-2 bg-gradient-to-r from-secondary/5 to-accent/5 mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-3">Типы покемонов</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Каждый покемон принадлежит к одному или двум типам, которые определяют его сильные и слабые стороны в бою. 
                  Используй фильтр ниже, чтобы найти покемонов по типу.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span><strong>Трава</strong> — контролирует растения</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span><strong>Огонь</strong> — управляет пламенем</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span><strong>Вода</strong> — водная стихия</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span><strong>Электро</strong> — электричество</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="relative">
                <Icon 
                  name="Search" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
                  size={20} 
                />
                <Input
                  type="text"
                  placeholder="Найти покемона..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 h-14 text-lg border-2"
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">Фильтр по типу</h3>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant={selectedType === null ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm"
                    onClick={() => setSelectedType(null)}
                  >
                    Все
                  </Badge>
                  {allTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      className={`cursor-pointer px-4 py-2 text-sm ${
                        selectedType === type ? `${typeColors[type]} text-white border-0` : ''
                      }`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredPokemon.length > 0 ? (
                filteredPokemon.map((pokemon) => (
                  <Card 
                    key={pokemon.id} 
                    className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2"
                  >
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-full h-48 flex items-center justify-center mb-4">
                        <img 
                          src={pokemon.image} 
                          alt={pokemon.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground font-semibold">
                          #{pokemon.id.toString().padStart(3, '0')}
                        </div>
                        <h3 className="text-2xl font-bold">{pokemon.name}</h3>
                        <div className="flex gap-2 justify-center flex-wrap">
                          {pokemon.types.map((type) => (
                            <Badge
                              key={type}
                              className={`${typeColors[type]} text-white border-0`}
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                        {pokemon.evolution && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="text-xs text-muted-foreground space-y-1">
                              {pokemon.evolution.from && (
                                <div className="flex items-center justify-center gap-1">
                                  <Icon name="ArrowLeft" size={12} />
                                  <span>Из: {pokemon.evolution.from}</span>
                                </div>
                              )}
                              {pokemon.evolution.to && (
                                <div className="flex items-center justify-center gap-1">
                                  <Icon name="ArrowRight" size={12} />
                                  <span>В: {pokemon.evolution.to}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">❓</div>
                  <p className="text-xl text-muted-foreground">
                    Покемон не найден
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;