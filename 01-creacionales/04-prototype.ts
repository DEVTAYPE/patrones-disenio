/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class DocumentC {
  title: string;
  private content: string;
  author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone(): DocumentC {
    return new DocumentC(this.title, this.content, this.author);
  }

  displayInfo() {
    console.log(`
      Título: ${this.title}
      Contenido: ${this.content}
      Autor: ${this.author}
    `);
  }
}

function main() {
  const originalDoc = new DocumentC(
    "Documento Original",
    "Este es el contenido del documento original.",
    "Juan Pérez",
  );
  const clonedDoc = originalDoc.clone();

  console.log("Documento Original:");
  originalDoc.displayInfo();

  console.log("Documento Clonado:");
  clonedDoc.displayInfo();

  // Modificando el documento clonado para demostrar que son independientes
  clonedDoc.title = "Documento Clonado Modificado";
  clonedDoc.author = "María Gómez";

  console.log("Después de modificar el documento clonado:");
  console.log("Documento Original:");
  originalDoc.displayInfo();

  console.log("Documento Clonado:");
  clonedDoc.displayInfo();
}

main();
