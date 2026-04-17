/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */
interface IIterator<T> {
  nexts(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  constructor(
    public name: string,
    public type: string,
  ) {}
}

class PokemonIterator implements IIterator<Pokemon> {
  private collection: PokemonCollection;
  private position: number = 0;

  constructor(pokemons: PokemonCollection) {
    this.collection = pokemons;
  }

  nexts(): Pokemon | null {
    if (this.hasNext()) {
      return this.collection.getPokemonAt(this.position++);
    }
    return null;
  }

  hasNext(): boolean {
    return this.position < this.collection.getCount();
  }

  current(): Pokemon | null {
    return this.collection.getPokemonAt(this.position) || null;
  }
}

class PokemonCollection {
  private pokemons: Pokemon[] = [];

  addPokemon(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }

  getPokemonAt(index: number): Pokemon | null {
    return this.pokemons[index] || null;
  }

  getCount(): number {
    return this.pokemons.length;
  }

  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }
}

function main() {
  const pokemonCollection = new PokemonCollection();
  pokemonCollection.addPokemon(new Pokemon("Pikachu", "Electric"));
  pokemonCollection.addPokemon(new Pokemon("Charmander", "Fire"));
  pokemonCollection.addPokemon(new Pokemon("Bulbasaur", "Grass"));

  const iterator = pokemonCollection.createIterator();

  while (iterator.hasNext()) {
    const pokemon = iterator.nexts();
    if (pokemon) {
      console.log(`Name: ${pokemon.name}, Type: ${pokemon.type}`);
    }
  }
}

main();
