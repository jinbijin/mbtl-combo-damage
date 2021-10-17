import { Component, HostBinding } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { CreateCharacter, SelectCharacter, StartEdit } from "src/app/state/index/index.actions";
import { IndexState } from "src/app/state/index/index.state";
import { Character } from "src/app/state/index/types/character.type";

@Component({
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent {
  @HostBinding('class.container') get containerClass(): boolean {
    return true;
  }

  @Select(IndexState.characters) characters$: Observable<Character>;
  @Select(IndexState.selectedCharacter) selectedCharacter$: Observable<Character | undefined>;

  constructor(private readonly store: Store) { }

  addCharacter(): void {
    this.store.dispatch(new CreateCharacter());
  }

  selectCharacter(characterId: number): void {
    this.store.dispatch(new SelectCharacter({ characterId }));
  }

  startEdit(): void {
    this.store.dispatch(new StartEdit());
  }
}
