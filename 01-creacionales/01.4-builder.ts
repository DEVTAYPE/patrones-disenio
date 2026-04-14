class Hamburger {
  bread: string = "";
  meat: string = "";
  cheese?: boolean = false;
  extras?: string[] = [];

  printInfo() {
    console.log({
      bread: this.bread,
      meat: this.meat,
      cheese: this.cheese,
      extras: this.extras,
    });
  }
}

class HamburgerBuilder {
  private hamburger: Hamburger;

  constructor() {
    this.hamburger = new Hamburger();
  }

  setBread(bread: string): HamburgerBuilder {
    this.hamburger.bread = bread;
    return this;
  }

  setMeat(meat: string): HamburgerBuilder {
    this.hamburger.meat = meat;
    return this;
  }

  addCheese(): HamburgerBuilder {
    this.hamburger.cheese = true;
    return this;
  }

  addExtra(extra: string): HamburgerBuilder {
    this.hamburger.extras?.push(extra);
    return this;
  }

  build(): Hamburger {
    return this.hamburger;
  }
}

function main() {
  const burger = new HamburgerBuilder()
    .setBread("integral")
    .setMeat("res")
    .addCheese()
    .addExtra("tocino")
    .addExtra("lechuga")
    .build();

  burger.printInfo();
}

main();
