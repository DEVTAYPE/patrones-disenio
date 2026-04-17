/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */
class GameMemento {
  constructor(
    private level: number,
    private health: number,
    private position: { x: number; y: number },
  ) {}

  getLevel() {
    return this.level;
  }

  getHealth() {
    return this.health;
  }

  getPosition() {
    return this.position;
  }
}

class Game {
  constructor(
    private level: number = 1,
    private health: number = 100,
    private position: { x: number; y: number } = { x: 0, y: 0 },
  ) {
    console.log(`Game started at level ${level} with health ${health}`);
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  restore(memento: GameMemento) {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(
      `Game restored to level ${this.level} with health ${this.health}`,
    );
  }

  play(level: number, health: number, position: { x: number; y: number }) {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(
      `Playing at level ${level} with health ${health} at position (${position.x}, ${position.y})`,
    );
  }
}

class GameHistory {
  private history: GameMemento[] = [];

  push(memento: GameMemento) {
    this.history.push(memento);
  }

  pop(): GameMemento | null {
    return this.history.pop() || null;
  }
}

function main() {
  const game = new Game(1, 100, { x: 0, y: 0 });
  const history = new GameHistory();

  history.push(game.save());

  game.play(2, 80, { x: 10, y: 10 });
  history.push(game.save());

  game.play(3, 50, { x: 20, y: 20 });

  const memento = history.pop();
  if (memento) {
    game.restore(memento);
  }
}

main();
