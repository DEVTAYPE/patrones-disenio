/*  
Ejercicio 2: Sistema de Temas (Intermedio)

📝 Enunciado
Debes crear un sistema de temas:

- Light Theme
- Dark Theme

Cada tema debe generar:

- Button
- Card
- Navbar

🎯 Objetivo
- const factory = new DarkThemeFactory();

- const button = factory.createButton();
- const card = factory.createCard();

⚠️ Requisitos
- Cada componente debe tener estilos distintos según tema
- Deben compartir interfaz común

💡 Ejemplo esperado
button.render(); // "Dark Button"
card.render();   // "Dark Card"

🔥 Mejora

Agrega un ThemeManager que cambie dinámicamente la factory
*/

interface IButton {
  render(): void;
}

interface ICard {
  render(): void;
}

interface INavbar {
  render(): void;
}

// crear las implementacion dark y ligh

class LightButton implements IButton {
  render(): void {
    console.log("Button light theme");
  }
}

class LightCard implements ICard {
  render(): void {
    console.log("Card light theme");
  }
}

class LightNavbar implements INavbar {
  render(): void {
    console.log("Navbar light theme");
  }
}

// ====================
class DarkButton implements IButton {
  render(): void {
    console.log("Button dark theme");
  }
}

class DarkCard implements ICard {
  render(): void {
    console.log("Card dark theme");
  }
}

class DarkNavbar implements INavbar {
  render(): void {
    console.log("Navbar dark theme");
  }
}

// =================
interface ITheme {
  createButton(): IButton;
  createCard(): ICard;
  createNavbar(): INavbar;
}

// ==================
class DarkThemeFactory implements ITheme {
  createButton(): IButton {
    return new DarkButton();
  }

  createCard(): ICard {
    return new DarkCard();
  }

  createNavbar(): INavbar {
    return new DarkNavbar();
  }
}

class LightThemeFactory implements ITheme {
  createButton(): IButton {
    return new LightButton();
  }

  createCard(): ICard {
    return new LightCard();
  }

  createNavbar(): INavbar {
    return new LightNavbar();
  }
}

// ==================

class ThemeFactory {
  static themes: Record<string, new () => ITheme> = {};

  static registerTheme(name: string, themeClass: new () => ITheme) {
    this.themes[name] = themeClass;
  }

  static themeManager(name: string): ITheme {
    const Theme = this.themes[name];
    if (!Theme) throw new Error("Tema no registrado");

    return new Theme();
  }
}

function main() {
  const theme = prompt("que tema prefieres: dark/light");

  if (!theme) {
    throw new Error("theme not typed");
  }

  ThemeFactory.registerTheme("dark", DarkThemeFactory);
  ThemeFactory.registerTheme("light", LightThemeFactory);

  const uiTheme = ThemeFactory.themeManager(theme);

  const button = uiTheme.createButton();
  const card = uiTheme.createCard();
  const navbar = uiTheme.createNavbar();

  navbar.render();
  card.render();
  button.render();
}

main();
