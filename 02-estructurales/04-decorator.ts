/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

interface INotification {
  send(message: string): void;
}

class BasicNotification implements INotification {
  send(message: string): void {
    console.log(`Basic notification: ${message}`);
  }
}

abstract class NotificationDecorator implements INotification {
  protected notification: INotification;

  constructor(notification: INotification) {
    this.notification = notification;
  }

  send(message: string): void {
    this.notification.send(message);
  }
}

class EmailNotification extends NotificationDecorator {
  private sendEmail(message: string): void {
    console.log(`Sending email notification: ${message}`);
  }

  send(message: string): void {
    super.send(message);
    this.sendEmail(message);
  }
}

class SMSNotification extends NotificationDecorator {
  private sendSMS(message: string): void {
    console.log(`Sending SMS notification: ${message}`);
  }

  send(message: string): void {
    super.send(message);
    this.sendSMS(message);
  }
}

function main() {
  const basicNotification: INotification = new BasicNotification();
  const emailNotification: INotification = new EmailNotification(
    basicNotification,
  );
  const smsNotification: INotification = new SMSNotification(emailNotification);

  smsNotification.send("Hello, World!");
}

main();
