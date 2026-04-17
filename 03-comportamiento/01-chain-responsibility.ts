/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// soporte basico
class BasicSupportHandler extends BaseHandler {
  override handle(request: string): string | null {
    if (request === "basic") {
      return `BasicSupportHandler: I'll handle the ${request} request.`;
    }

    // super llama al siguiente handler en la cadena
    console.log(
      `BasicSupportHandler: Can't handle ${request} request. Passing to the next handler.`,
    );
    return super.handle(request);
  }
}

// soporte avanzado
class AdvancedSupportHandler extends BaseHandler {
  override handle(request: string): string | null {
    if (request === "advanced") {
      return `AdvancedSupportHandler: I'll handle the ${request} request.`;
    }

    console.log(
      `AdvancedSupportHandler: Can't handle ${request} request. Passing to the next handler.`,
    );

    return super.handle(request);
  }
}

// soporte experto
class ExpertSupportHandler extends BaseHandler {
  override handle(request: string): string | null {
    if (request === "expert") {
      return `ExpertSupportHandler: I'll handle the ${request} request.`;
    }

    console.log(
      `ExpertSupportHandler: Can't handle ${request} request. Passing to the next handler.`,
    );
    return super.handle(request);
  }
}

// cliente
function clientCode(handler: Handler) {
  // const result = handler.handle("expert");
  // if (result) {
  //   console.log(result);
  // }

  const requests = ["basic", "advanced", "expert", "unknown"];

  for (const request of requests) {
    const result = handler.handle(request);
    if (result) {
      console.log(result);
    } else {
      console.log(`No handler could process the ${request} request.`);
    }
  }
}

// configurando la cadena de responsabilidad
const basicHandler = new BasicSupportHandler();
const advancedHandler = new AdvancedSupportHandler();
const expertHandler = new ExpertSupportHandler();

basicHandler.setNext(advancedHandler).setNext(expertHandler);

// ejecutando el cliente
clientCode(basicHandler);
