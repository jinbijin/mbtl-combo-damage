import { Link } from "../../types/link.type";
import { Character } from "./character.type";

export interface IndexResponse {
  characters: Character[];
  links: Link[];
}
