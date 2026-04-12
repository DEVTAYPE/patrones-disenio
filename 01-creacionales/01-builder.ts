/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
  public cpu: string = "cpu - not defined";
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu?: string;

  displayInfo() {
    console.log(`Configuracion del sistema
      CPU: ${this.cpu}
      RAM: ${this.ram}
      Storage: ${this.storage}
      GPU: ${this.gpu || "gpu - not defined"}
    `);
  }
}

class ComputerBuilder {
  private computer: Computer;

  // El constructor inicializa una nueva instancia de Computer
  // Ejem: const builder = new ComputerBuilder();
  constructor() {
    this.computer = new Computer();
  }

  // devolvemos la instancia de Computer para que el cliente pueda acceder a ella
  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build(): Computer {
    return this.computer;
  }
}

function main() {
  const basicComputer = new ComputerBuilder()
    .setCPU("Intel i5")
    .setRAM("8GB")
    .setRAM("16GB") // Sobrescribimos el valor anterior de RAM
    .setStorage("256GB SSD")
    .build();

  console.log("%Computadora realizado.", COLORS.blue);
  basicComputer.displayInfo();
}

main();
