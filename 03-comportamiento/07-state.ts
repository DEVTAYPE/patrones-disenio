/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

// Interfaz para los estados de la máquina expendedora
interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingForMoneyState(this);
  }

  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  getState() {
    return this.state.name;
  }

  setState(newState: State) {
    this.state = newState;
  }
}

class WaitingForMoneyState implements State {
  name = "Esperando Dinero";
  private vendingMachine: VendingMachine;

  constructor(private machine: VendingMachine) {
    this.vendingMachine = machine;
  }

  insertMoney() {
    console.log(
      "Dinero insertado. Cambiando a estado de selección de producto.",
    );
    this.vendingMachine.setState(
      new SelectingProductState(this.vendingMachine),
    );
  }

  selectProduct() {
    console.log(
      "No se puede seleccionar un producto. Por favor, inserte dinero primero.",
    );
  }

  dispenseProduct() {
    console.log(
      "No se puede dispensar un producto. Por favor, inserte dinero primero.",
    );
  }
}

class SelectingProductState implements State {
  name = "Seleccionando Producto";
  private vendingMachine: VendingMachine;

  constructor(private machine: VendingMachine) {
    this.vendingMachine = machine;
  }

  insertMoney() {
    console.log(
      "Ya se ha insertado dinero. Por favor, seleccione un producto.",
    );
  }

  selectProduct() {
    console.log(
      "Producto seleccionado. Cambiando a estado de entrega de producto.",
    );
    // this.vendingMachine.setState(new DispensingProductState(this.vendingMachine));
  }

  dispenseProduct() {
    console.log(
      "No se puede dispensar un producto. Por favor, seleccione un producto primero.",
    );
  }
}

class DispensingProductState implements State {
  name = "Entregando Producto";
  private vendingMachine: VendingMachine;

  constructor(private machine: VendingMachine) {
    this.vendingMachine = machine;
  }

  insertMoney() {
    console.log(
      "No se puede insertar dinero. El producto está siendo dispensado.",
    );
  }

  selectProduct() {
    console.log(
      "No se puede seleccionar un producto. El producto está siendo dispensado.",
    );
  }

  dispenseProduct() {
    console.log(
      "Producto dispensado. Volviendo al estado de espera de dinero.",
    );
    this.vendingMachine.setState(new WaitingForMoneyState(this.vendingMachine));
  }
}

function main() {
  const vendingMachine = new VendingMachine();

  console.log(`Estado actual: ${vendingMachine.getState()}`);
  vendingMachine.insertMoney();
  console.log(`Estado actual: ${vendingMachine.getState()}`);
  vendingMachine.selectProduct();
  console.log(`Estado actual: ${vendingMachine.getState()}`);
  vendingMachine.dispenseProduct();
  console.log(`Estado actual: ${vendingMachine.getState()}`);
}

main();
