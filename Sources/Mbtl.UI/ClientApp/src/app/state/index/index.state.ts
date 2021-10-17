import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { Link } from "../types/link.type";
import { CreateCharacter, DeleteCharacter, GetInitialState, SaveCharacter, SelectCharacter, StartEdit, UndoEdit } from "./index.actions";
import { IndexStateModel, INDEX_STATE_DEFAULTS } from "./index.state-model";
import { Character } from "./types/character.type";
import { IndexResponse } from "./types/index.response.type";

@State<IndexStateModel>({
  name: 'root',
  defaults: INDEX_STATE_DEFAULTS
})
@Injectable()
export class IndexState implements NgxsOnInit {
  @Selector()
  static characters(state: IndexStateModel): Character[] {
    return [...state.characters].sort((x, y) => x.name.toLocaleLowerCase().localeCompare(y.name.toLocaleLowerCase()));
  }

  @Selector()
  static links(state: IndexStateModel): Link[] {
    return state.links;
  }

  @Selector([IndexState.links])
  static addCharacterLink(links: Link[]): Link | undefined {
    return links.find(x => x.key === 'AddCharacter');
  }

  @Selector()
  static selectedCharacterId(state: IndexStateModel): number | undefined {
    return state.selectedCharacterId;
  }

  @Selector([IndexState.characters, IndexState.selectedCharacterId])
  static selectedCharacter(characters: Character[], selectedCharacterId?: number): Character | undefined {
    return characters.find(x => x.id === selectedCharacterId);
  }

  @Selector()
  static editingCharacterName(state: IndexStateModel): boolean {
    return state.editingCharacterName;
  }

  @Selector([IndexState.selectedCharacter])
  static selectedCharacterSetNameLink(character?: Character): Link | undefined {
    return character?.links.find(x => x.key === 'SetName');
  }

  @Selector([IndexState.addCharacterLink, IndexState.selectedCharacterSetNameLink])
  static saveLink(addCharacterLink?: Link, saveCharacterLink?: Link): Link | undefined {
    return saveCharacterLink ?? addCharacterLink;
  }

  @Selector([IndexState.selectedCharacter])
  static selectedCharacterDeleteLink(character?: Character): Link | undefined {
    return character?.links.find(x => x.key === 'Delete');
  }

  constructor(
    private readonly http: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
  ) { }

  ngxsOnInit(ctx: StateContext<IndexStateModel>): void {
    ctx.dispatch(new GetInitialState());
  }

  @Action(GetInitialState)
  getInitialState(ctx: StateContext<IndexStateModel>): Observable<any> {
    return this.http.get<IndexResponse>(`${this.baseUrl}api`).pipe(
      tap(response => ctx.setState({
        ...response,
        editingCharacterName: false
      }))
    );
  }

  @Action(CreateCharacter)
  createCharacter(ctx: StateContext<IndexStateModel>): void {
    ctx.patchState({ editingCharacterName: true, selectedCharacterId: undefined });
  }

  @Action(SelectCharacter)
  selectCharacter(ctx: StateContext<IndexStateModel>, { payload }: SelectCharacter): void {
    ctx.patchState({ selectedCharacterId: payload.characterId });
  }

  @Action(StartEdit)
  startEdit(ctx: StateContext<IndexStateModel>): void {
    ctx.patchState({ editingCharacterName: true });
  }

  @Action(UndoEdit)
  undoEdit(ctx: StateContext<IndexStateModel>): void {
    ctx.patchState({ editingCharacterName: false });
  }

  @Action(SaveCharacter)
  saveCharacter(ctx: StateContext<IndexStateModel>, { payload }: SaveCharacter): Observable<any> {
    const characters = ctx.getState().characters;
    return this.http[payload.link.method.toLowerCase()](`${this.baseUrl}api/${payload.link.href}`, { name: payload.name }).pipe(
      tap((response: Character) => ctx.setState(patch({
        characters: characters.find(x => x.id === response.id) ? updateItem(x => x.id === response.id, response) : append([response]),
        editingCharacterName: false
      })))
    );
  }

  @Action(DeleteCharacter)
  deleteCharacter(ctx: StateContext<IndexStateModel>, { payload }: DeleteCharacter): Observable<any> {
    return this.http[payload.link.method.toLowerCase()](`${this.baseUrl}api/${payload.link.href}`).pipe(
      tap(() => ctx.setState(patch({
        characters: removeItem((x: Character) => x.id === payload.characterId ),
        editingCharacterName: false
      })))
    );
  }
}
