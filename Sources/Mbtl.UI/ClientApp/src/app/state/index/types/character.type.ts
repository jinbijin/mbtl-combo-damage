import { Link } from "../../types/link.type";

export interface Character {
  id: number;
  name: string;
  links: Link[];
}
