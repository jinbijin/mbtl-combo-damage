import { Link } from "../types/link.type";
import { Character } from "./types/character.type";

export interface IndexStateModel {
  characters: Character[];
  links: Link[];
}

export const INDEX_STATE_DEFAULTS: IndexStateModel = {
  characters: [],
  links: [],
}
