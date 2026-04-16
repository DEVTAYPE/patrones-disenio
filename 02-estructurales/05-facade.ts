/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

class Projector {
  turnOn() {
    console.log("Projector is on");
  }

  turnOff() {
    console.log("Projector is off");
  }
}

class SoundSystem {
  on() {
    console.log("Sound system is on");
  }

  off() {
    console.log("Sound system is off");
  }
}

class VideoPlayer {
  on() {
    console.log("Video player is on");
  }

  play() {
    console.log("Video is playing");
  }

  stop() {
    console.log("Video is stopped");
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log("Popping popcorn");
  }

  turnOffPopcornMaker() {
    console.log("Popcorn maker is off");
  }
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor() {
    this.projector = new Projector();
    this.soundSystem = new SoundSystem();
    this.videoPlayer = new VideoPlayer();
    this.popcornMaker = new PopcornMaker();
  }

  watchMovie() {
    console.log("Get ready to watch a movie...");
    this.popcornMaker.poppingPopcorn();
    this.projector.turnOn();
    this.soundSystem.on();
    this.videoPlayer.on();
    this.videoPlayer.play();
  }

  endMovie() {
    console.log("Shutting down the home theater...");
    this.popcornMaker.turnOffPopcornMaker();
    this.projector.turnOff();
    this.soundSystem.off();
    this.videoPlayer.stop();
  }
}

function main() {
  const homeTheater = new HomeTheaterFacade();
  homeTheater.watchMovie();

  // Simulate watching the movie for a while
  setTimeout(() => {
    homeTheater.endMovie();
  }, 5000);
}

main();
