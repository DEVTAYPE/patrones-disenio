/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */
interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  suscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`${observer.constructor.name} se ha suscrito a ${this.name}`);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((obs) => obs !== observer);
    console.log(
      `${observer.constructor.name} se ha desuscrito de ${this.name}`,
    );
  }

  notifySubscribers(videoTitle: string): void {
    this.subscribers.forEach((subscriber) => subscriber.notify(videoTitle));
  }

  uploadVideo(videoTitle: string): void {
    console.log(`${this.name} ha subido un nuevo video: ${videoTitle}`);
    this.notifySubscribers(videoTitle);
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(
      `${this.name} ha sido notificado de un nuevo video: ${videoTitle}`,
    );
  }
}

function main() {
  const channel = new YouTubeChannel("Tech Channel");

  const subscriber1 = new Subscriber("Alice");
  const subscriber2 = new Subscriber("Bob");

  channel.suscribe(subscriber1);
  channel.suscribe(subscriber2);

  channel.uploadVideo("Introducción a TypeScript");

  channel.unsubscribe(subscriber1);

  channel.uploadVideo("Patrón Observer en TypeScript");
}

main();
