/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */
interface Command {
  execute(): void;
}

class Light {
  turnOn() {
    console.log("La luz se ha encendido.");
  }

  turnOff() {
    console.log("La luz se ha apagado.");
  }
}

class Fan {
  on() {
    console.log("El ventilador está encendido.");
  }

  off() {
    console.log("El ventilador está apagado.");
  }
}

class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  private fan: Fan;

  constructor(fan: Fan) {
    this.fan = fan;
  }

  execute() {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  private fan: Fan;

  constructor(fan: Fan) {
    this.fan = fan;
  }

  execute() {
    this.fan.off();
  }
}

class RemoteControl {
  private command: Record<string, Command> = {};

  setCommand(button: string, command: Command) {
    this.command[button] = command;
  }

  pressButton(button: string) {
    if (this.command[button]) {
      this.command[button].execute();
      return;
    }

    console.log("No se ha asignado ningún comando.");
  }
}

// Uso del patrón Command
function main() {
  const light = new Light();
  const fan = new Fan();

  const lightOn = new LightOnCommand(light);
  const lightOff = new LightOffCommand(light);
  const fanOn = new FanOnCommand(fan);
  const fanOff = new FanOffCommand(fan);

  const remote = new RemoteControl();
  remote.setCommand("lightOn", lightOn);
  remote.setCommand("lightOff", lightOff);
  remote.setCommand("fanOn", fanOn);
  remote.setCommand("fanOff", fanOff);

  remote.pressButton("lightOn");
  remote.pressButton("fanOn");
  remote.pressButton("lightOff");
  remote.pressButton("fanOff");
}

main();
