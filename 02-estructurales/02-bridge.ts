/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

interface IAbility {
  use(): void;
}

class Sword implements IAbility {
  use() {
    console.log("Usando espada");
  }
}

class MagicSpell implements IAbility {
  use() {
    console.log("Lanzando hechizo mágico");
  }
}

abstract class Character {
  protected ability: IAbility;

  constructor(ability: IAbility) {
    this.ability = ability;
  }

  setAbility(ability: IAbility) {
    this.ability = ability;
  }

  // Cada personaje puede realizar su habilidad, pero la implementación de esa habilidad
  abstract performAbility(): void;
}

class Warrior extends Character {
  override performAbility(): void {
    console.log("Guerrero:");
    this.ability.use();
  }
}

class Mage extends Character {
  override performAbility(): void {
    console.log("Mago:");
    this.ability.use();
  }
}

function main() {
  const sword = new Sword();
  const magicSpell = new MagicSpell();

  const warrior = new Warrior(sword);
  const mage = new Mage(magicSpell);

  warrior.performAbility(); // Guerrero: Usando espada
  mage.performAbility(); // Mago: Lanzando hechizo mágico

  // Cambiamos la habilidad del guerrero a un hechizo mágico
  warrior.setAbility(magicSpell);
  warrior.performAbility(); // Guerrero: Lanzando hechizo mágico
}

main();
