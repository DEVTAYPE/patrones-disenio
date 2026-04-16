/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

class Player {
  constructor(name: string, level: number) {}
}

interface IRoom {
  enter(player: Player): void;
}

class SecretRoom implements IRoom {
  enter(player: Player): void {
    console.log(`${player} ha entrado a la sala secreta`);
  }
}

class RoomProxy implements IRoom {
  private secretRoom: SecretRoom;

  constructor() {
    this.secretRoom = new SecretRoom();
  }

  enter(player: Player): void {
    if (this.hasAccess(player)) {
      this.secretRoom.enter(player);
    } else {
      console.log(`${player} no tiene acceso a la sala secreta`);
    }
  }

  private hasAccess(player: Player): boolean {
    // Simulamos una verificación de acceso
    return Math.random() > 0.5;
  }
}

// Uso del patrón Proxy
function main() {
  const roomProxy = new RoomProxy();
  const player = new Player("Alice", 10);

  roomProxy.enter(player);
}

main();
