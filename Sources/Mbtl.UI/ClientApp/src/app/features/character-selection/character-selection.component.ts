import { Component, Inject, Type } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { IndexState } from "src/app/state/index/index.state";
import { Character } from "src/app/state/index/types/character.type";
import { Link } from "src/app/state/types/link.type";
import { HEADER_CONTENT_COMPONENT } from "./content-component.token";

@Component({
  selector: 'header[appCharacterSelection]',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent {
  @Select(IndexState.characters) characters$: Observable<Character>;
  @Select(IndexState.addCharacterLink) addCharacterLink$: Observable<Link | undefined>;
  @Select(IndexState.selectedCharacter) selectedCharacter$: Observable<Character | undefined>;
  @Select(IndexState.editingCharacterName) editingCharacterName$: Observable<boolean>;

  constructor(@Inject(HEADER_CONTENT_COMPONENT) public readonly contentComponent$: Observable<Type<any>>) {}
}
