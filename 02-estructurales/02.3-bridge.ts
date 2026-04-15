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

// 1. Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.
interface NotificationChannel {
  send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notification2 {
  protected channels: NotificationChannel[];

  constructor(channels: NotificationChannel[]) {
    this.channels = channels;
  }

  // setChannel(channel: NotificationChannel): void {
  //   this.channel = channel;
  // }
  abstract addChannel(channel: NotificationChannel): void;
  abstract notify(message: string): void;
}

// 4. Clases Concretas de Notificaciones

class AlertNotification extends Notification2 {
  notify(message: string): void {
    console.log(
      "\n%cNotificación de Alerta:",
      "color: red; font-weight: bold;",
    );
    this.channels.forEach((channel) => channel.send(message));
  }

  addChannel(channel: NotificationChannel): void {
    console.log(`Agregando canal de alerta: ${channel.constructor.name}`);
    this.channels.push(channel);
  }
}

class ReminderNotification extends Notification2 {
  notify(message: string): void {
    console.log(
      "\n%cNotificación de Recordatorio:",
      "color: blue; font-weight: bold;",
    );
    this.channels.forEach((channel) => channel.send(message));
  }

  addChannel(channel: NotificationChannel): void {
    console.log(`Agregando canal de recordatorio: ${channel.constructor.name}`);
    this.channels.push(channel);
  }
}

class PushNotification extends Notification2 {
  override notify(message: string): void {
    console.log(
      "\n%cNotificación de Push:",
      "color: green; font-weight: bold;",
    );
    this.channels.forEach((channel) => channel.send(message));
  }

  override addChannel(channel: NotificationChannel): void {
    console.log(`Agregando canal de push: ${channel.constructor.name}`);
    this.channels.push(channel);
  }
}

// 5. Código Cliente para Probar el Bridge
function main() {
  // Crear una notificación de alerta usando el canal de correo electrónico
  const emailChannel = new EmailChannel();
  const alertNotification = new AlertNotification([emailChannel]);
  alertNotification.notify("¡Esto es una alerta!");

  // Cambiar el canal de la notificación de alerta a SMS
  const smsChannel = new SMSChannel();
  alertNotification.addChannel(smsChannel);
  alertNotification.notify("¡Esto es una alerta con SMS!");

  // Crear una notificación de recordatorio usando el canal de push
  const pushChannel = new PushNotificationChannel();
  const reminderNotification = new ReminderNotification([pushChannel]);
  reminderNotification.notify("¡Esto es un recordatorio!");

  // Cambiar el canal de la notificación de recordatorio a correo electrónico
  reminderNotification.addChannel(emailChannel);
  reminderNotification.notify(
    "¡Esto es un recordatorio con correo electrónico!",
  );
}

main();
