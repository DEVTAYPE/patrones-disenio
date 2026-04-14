/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface IHamburger {
  prepare(): void;
}

class ChickenHamburger implements IHamburger {
  prepare(): void {
    console.log("Preparando Hamburguesa de %cpollo", COLORS.yellow);
  }
}

class BeefHamburger implements IHamburger {
  prepare(): void {
    console.log("Preparando Hamburguesa de %cres", COLORS.brown);
  }
}

class BeenHamburger implements IHamburger {
  prepare(): void {
    console.log("Preparando Hamburguesa de %cfrijol", COLORS.green);
  }
}

abstract class Restaurant {
  protected abstract createHamburger(): IHamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  override createHamburger(): IHamburger {
    return new ChickenHamburger();
  }
}

class BeefRestaurant extends Restaurant {
  override createHamburger(): IHamburger {
    return new BeefHamburger();
  }
}

class BeenRestaurant extends Restaurant {
  override createHamburger(): IHamburger {
    return new BeenHamburger();
  }
}

function main() {
  let restaurant: Restaurant;

  const burgerType = prompt(
    "Escriba el tipo de hamburguesa que quieres: chicken / beef / been ",
  );

  switch (burgerType) {
    case "chicken":
      restaurant = new ChickenRestaurant();
      break;
    case "beef":
      restaurant = new BeefRestaurant();
      break;
    case "been":
      restaurant = new BeenRestaurant();
      break;
    default:
      throw new Error("Opción no disponible");
  }

  restaurant.orderHamburger();
}

main();
