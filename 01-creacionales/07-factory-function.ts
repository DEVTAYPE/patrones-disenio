/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

type TLanguage = "en" | "es" | "fr";

function createGreeter(language: TLanguage) {
  return function (name: string) {
    const messages: Record<TLanguage, string> = {
      es: `¡Hola, ${name}!`,
      en: `Hello, ${name}!`,
      fr: `Bonjour, ${name}!`,
    };

    return console.log(messages[language]);
  };
}

function main() {
  const spanishGreeter = createGreeter("es");
  spanishGreeter("Juan");
}

main();
