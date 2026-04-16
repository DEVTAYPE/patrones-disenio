/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */
interface ILocation {
  display(coordinates: { x: number; y: number }): void;
}

class LocationIcon implements ILocation {
  constructor(
    private type: string,
    private iconImage: string,
  ) {}

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coord: ${this.type} en (${coordinates.x}, ${coordinates.y}) con icono ${this.iconImage}`,
    );
  }
}

class LocationFactory {
  private icons: Record<string, LocationIcon> = {};

  getLocationIcon(type: string): LocationIcon {
    const typeIcon = type.toLocaleLowerCase();

    if (!this.icons[typeIcon]) {
      // Simulamos la creación de un icono costoso
      const iconImage = `icon_${typeIcon}.png`;
      this.icons[typeIcon] = new LocationIcon(type, iconImage);
    }
    return this.icons[typeIcon];
  }
}

class MapLocation {
  constructor(
    private icon: LocationIcon,
    private coordinates: { x: number; y: number },
  ) {}

  display(): void {
    this.icon.display(this.coordinates);
  }
}

// Uso del patrón Flyweight
function main() {
  const factory = new LocationFactory();

  const locations = [
    new MapLocation(factory.getLocationIcon("Restaurant"), { x: 10, y: 20 }),
    new MapLocation(factory.getLocationIcon("Restaurant"), { x: 15, y: 25 }),
    new MapLocation(factory.getLocationIcon("Park"), { x: 5, y: 10 }),
    new MapLocation(factory.getLocationIcon("Park"), { x: 8, y: 12 }),
    new MapLocation(factory.getLocationIcon("Museum"), { x: 20, y: 30 }),
  ];

  locations.forEach((location) => location.display());
}

main();
