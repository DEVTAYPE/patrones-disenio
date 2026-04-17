/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */
interface MovementStrategy {
  move(): void;
}

// Estrategia #1
class SwimStrategy implements MovementStrategy {
  move(): void {
    console.log("El patito nada.");
  }
}

// Estrategia #2
class FlyStrategy implements MovementStrategy {
  move(): void {
    console.log("El patito vuela.");
  }
}

// Estrategia #3
class WalkStrategy implements MovementStrategy {
  move(): void {
    console.log("El patito camina.");
  }
}

class Duck {
  private movementStrategy: MovementStrategy;

  constructor(movementStrategy: MovementStrategy) {
    this.movementStrategy = movementStrategy;
  }

  setMovementStrategy(movementStrategy: MovementStrategy): void {
    this.movementStrategy = movementStrategy;
  }

  performMove(): void {
    this.movementStrategy.move();
  }
}

// Uso del patrón Strategy
function main() {
  const swimDuck = new Duck(new SwimStrategy());
  const flyDuck = new Duck(new FlyStrategy());
  const walkDuck = new Duck(new WalkStrategy());

  console.log("La carrera comienza:");
  swimDuck.performMove(); // El patito nada.
  flyDuck.performMove(); // El patito vuela.
  walkDuck.performMove(); // El patito camina.

  console.log("\nEl patito nadador decide volar:");
  swimDuck.setMovementStrategy(new FlyStrategy());
  swimDuck.performMove(); // El patito vuela.
}

main();
