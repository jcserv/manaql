export enum CardType {
    Battle = "Battle",
    Planeswalker = "Planeswalker",
    Creature = "Creature",
    Sorcery = "Sorcery",
    Instant = "Instant",
    Artifact = "Artifact",
    Enchantment = "Enchantment",
    Land = "Land",
    Kindred = "Kindred",
    Conspiracy = "Conspiracy",
    Dungeon = "Dungeon",
    Phenomenon = "Phenomenon",
    Plane = "Plane",
    Scheme = "Scheme",
    Vanguard = "Vanguard",
    Unknown = "Unknown",
  }

export function toCardType(value: string): CardType {
  switch (value) {
    case "Battle":
      return CardType.Battle;
    case "Planeswalker":
      return CardType.Planeswalker;
    case "Creature":
      return CardType.Creature;
    case "Sorcery":
      return CardType.Sorcery;
    case "Instant":
      return CardType.Instant;
    case "Artifact":
      return CardType.Artifact;
    case "Enchantment":
      return CardType.Enchantment;
    case "Land":
      return CardType.Land;
    case "Kindred":
      return CardType.Kindred;
    case "Conspiracy":
      return CardType.Conspiracy;
    case "Dungeon":
      return CardType.Dungeon;
    case "Phenomenon":
      return CardType.Phenomenon;
    case "Plane":
      return CardType.Plane;
    case "Scheme":
      return CardType.Scheme;
    case "Vanguard":
      return CardType.Vanguard;
    default:
      return CardType.Unknown;
  }
}

export enum Finish {
    nonfoil = "nonfoil",
    foil = "foil",
    etched = "etched",
}

export function toFinishes(vals: string[]): Finish[] {
  return vals.map((val) => {
    switch (val) {
      case "nonfoil":
        return Finish.nonfoil;
      case "foil":
        return Finish.foil;
      case "etched":
        return Finish.etched;
      default:
        return Finish.nonfoil;
    }
  });
}