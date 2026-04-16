/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

interface FileSystemComponent {
  showDetails(indent?: string): void;
}

class File implements FileSystemComponent {
  constructor(private name: string) {}

  showDetails(indent: string = "") {
    console.log(`${indent}+ Archivo: ${this.name}`);
  }
}

class Folder implements FileSystemComponent {
  private children: FileSystemComponent[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  showDetails(indent?: string): void {
    console.log(`${indent}- Carpeta: ${this.name}`);
    this.children.forEach((child) => child.showDetails(indent + "  "));
  }

  add(component: FileSystemComponent) {
    this.children.push(component);
  }

  remove(component: FileSystemComponent) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
}

// Uso del patrón Composite
function main() {
  const root = new Folder("root");
  const folder1 = new Folder("folder1");
  const folder2 = new Folder("folder2");
  const file1 = new File("file1.txt");
  const file2 = new File("file2.txt");
  const file3 = new File("file3.txt");

  folder1.add(file1);
  folder1.add(file2);
  folder2.add(file3);
  root.add(folder1);
  root.add(folder2);

  root.showDetails("");
}

main();
