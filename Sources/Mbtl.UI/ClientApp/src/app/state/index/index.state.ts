import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Link } from "../types/link.type";
import { GetInitialState } from "./index.actions";
import { IndexStateModel, INDEX_STATE_DEFAULTS } from "./index.state-model";
import { IndexResponse } from "./types/index.response.type";

@State<IndexStateModel>({
  name: 'root',
  defaults: INDEX_STATE_DEFAULTS
})
@Injectable()
export class IndexState implements NgxsOnInit {
  @Selector()
  static characters(state: IndexStateModel) {
    return state.characters;
  }

  @Selector()
  static links(state: IndexStateModel) {
    return state.links;
  }

  @Selector([IndexState.links])
  static addCharacterLink(links: Link[]): Link | undefined {
    return links.find(x => x.key === 'AddCharacter');
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
      tap(response => ctx.setState(response))
    );
  }
}
