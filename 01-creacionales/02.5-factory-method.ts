/* 
Ejercicio 3: Parser de Archivos (Avanzado 🔥)

📝 Enunciado
Debes crear un sistema que procese archivos de distintos formatos:

- JSON
- XML
- CSV

Cada parser debe tener:
- parse(data)

🎯 Objetivo

- const parser = ParserFactory.create("json");
- const result = parser.parse(data);

⚠️ Requisitos importantes
Cada parser transforma el input de forma distinta
Debe ser fácil agregar nuevos formatos (ej: YAML) sin romper código existente
*/

abstract class IParser {
  abstract parse(data: string): any;
}

class JSONParser extends IParser {
  override parse(data: string): any {
    console.log("Parsing JSON data...");
    return JSON.parse(data);
  }
}

class XMLParser extends IParser {
  override parse(data: string): any {
    console.log("Parsing XML data...");
    // Implement XML parsing logic here
    return data;
  }
}

class CSVParser extends IParser {
  override parse(data: string): any {
    console.log("Parsing CSV data...");
    // Implement CSV parsing logic here
    return data;
  }
}

class ParserFactory {
  static parsers: Record<string, new () => IParser> = {};

  static registerParser(type: string, ParserClass: new () => IParser): void {
    this.parsers[type] = ParserClass;
  }

  static create(type: string): IParser {
    const ParserClass = this.parsers[type];
    if (!ParserClass) {
      throw new Error(`Parser not found for type: ${type}`);
    }
    return new ParserClass();
  }
}

function main() {
  // Register parsers
  ParserFactory.registerParser("json", JSONParser);
  ParserFactory.registerParser("xml", XMLParser);
  ParserFactory.registerParser("csv", CSVParser);

  const type = prompt("Ingrese el tipo de parser (json/xml/csv)");
  const data = prompt("Ingrese los datos a parsear");

  /* 
  Ejemplo:
    json: {"name": "John", "age": 30}
    xml: <person><name>John</name><age>30</age></person>
    csv: name,age\nJohn,30
  */

  const parser = ParserFactory.create(type as any);

  const parse = parser.parse(data as string);
  console.log("Resultado del parseo:", parse);
}

main();
