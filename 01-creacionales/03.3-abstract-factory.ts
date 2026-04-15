/* 
Ejercicio 1: UI Cross-Platform (Básico)

📝 Enunciado
Debes crear una librería de UI que soporte 2 plataformas:

- Web
- Mobile

Cada plataforma tiene:

- Button
- Input

🎯 Objetivo
- const factory = new WebUIFactory();

- const button = factory.createButton();
- const input = factory.createInput();

✅ Resultado esperado
- WebButton / MobileButton
- WebInput / MobileInput

Todos implementan interfaces comunes
💡 Clave

👉 No mezclar componentes (no usar WebButton con MobileInput)
*/

interface IButton {
  render(): void;
}

interface IInput {
  render(): void;
}

class WebButton implements IButton {
  render(): void {
    console.log("Renderizando botón para web...");
  }
}

class MobileButton implements IButton {
  render(): void {
    console.log("Renderizando botón para móvil...");
  }
}

class WebInput implements IInput {
  render(): void {
    console.log("Renderizando input para web...");
  }
}

class MobileInput implements IInput {
  render(): void {
    console.log("Renderizando input para móvil...");
  }
}

interface IUIFactory {
  createButton(): IButton;
  createInput(): IInput;
}

class WebUIFactory implements IUIFactory {
  createButton(): IButton {
    return new WebButton();
  }

  createInput(): IInput {
    return new WebInput();
  }
}

class MobileUIFactory implements IUIFactory {
  createButton(): IButton {
    return new MobileButton();
  }

  createInput(): IInput {
    return new MobileInput();
  }
}

function renderUI(factory: IUIFactory) {
  return {
    button: factory.createButton(),
    input: factory.createInput(),
  };
}

function main(factory: IUIFactory) {
  const { button, input } = renderUI(factory);

  button.render();
  input.render();
}

console.log("UI para Web");
main(new WebUIFactory());

console.log("\n\nUI para Móvil");
main(new MobileUIFactory());
