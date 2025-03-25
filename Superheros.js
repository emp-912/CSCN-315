class SuperHero {
  constructor(name, alias, power, universe) {
    this.name = name;
    this.alias = alias;
    this.power = power;
    this.universe = universe;
  }
}
const hero1 = new SuperHero(
  "Bruce Wayne",
  "Batman",
  "Peak human ability, detective skills",
  "DC"
);
const hero2 = new SuperHero("Peter Parker", "Spiderman", "xxxxxxx", "Marvel");

function OutPutHeros() {
  return hero1 + hero2;
}
