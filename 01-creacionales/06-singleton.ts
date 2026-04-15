/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */
class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
    }
    return DragonBalls.instance;
  }

  collectBall(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(
        `Has recogido una bola de dragón. Total: ${this.ballsCollected}`,
      );
      return;
    }

    console.log(
      "¡Has recogido las 7 bolas de dragón! ¡Puedes invocar a Shenlong!",
    );
  }

  summonShenlong(): void {
    if (this.ballsCollected === 7) {
      console.log("¡Shenlong ha sido invocado! ¡Pide tu deseo!");
      this.ballsCollected = 0; // Reinicia las bolas después de invocar a Shenlong
      return;
    }
    console.log(
      `Aún no has recogido las 7 bolas de dragón. Total: ${this.ballsCollected}`,
    );
  }
}

function main() {
  const gokuDragonBalls = DragonBalls.getInstance();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();

  const vegetaDragonBalls = DragonBalls.getInstance();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();

  gokuDragonBalls.summonShenlong();
}

main();
