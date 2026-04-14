/* 
Ejercicio 1: Notificaciones (Básico)

Debes crear un sistema de notificaciones que soporte:

- Email
- SMS
- Push

Cada tipo debe tener un método:

- send(message)

🎯 Objetivo

Crear una factory:

const factory = new NotificationFactory();

const notification = factory.create("email");
notification.send("Hola mundo");
*/

abstract class INotification {
  abstract send(msg: string): void;
}

class EmailFactory extends INotification {
  override send(msg: string): void {
    console.log(`email notification.... ${msg}`);
  }
}

class SMSFactory extends INotification {
  override send(msg: string): void {
    console.log(`SMS notification.... ${msg}`);
  }
}

class PushFactory extends INotification {
  override send(msg: string): void {
    console.log(`email notification.... ${msg}`);
  }
}

class NotificationFactory {
  create(type: "email" | "push" | "sms"): INotification {
    switch (type) {
      case "email":
        return new EmailFactory();
      case "push":
        return new PushFactory();
      case "sms":
        return new SMSFactory();
      default:
        throw new Error("Tipo no soportado");
    }
  }
}

function main() {
  const type = prompt("Ingrese el tipo de notificacion (email/push/sms)");
  const factory = new NotificationFactory();
  const notification = factory.create(type as any);

  notification.send("Hola mundo");
}

main();
