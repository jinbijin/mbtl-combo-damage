import { inject, InjectionToken, Type } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { IndexState } from "src/app/state/index/index.state";
import { ReadComponent } from "./components/read.component";
import { WriteComponent } from "./components/write.component";

export const HEADER_CONTENT_COMPONENT: InjectionToken<Observable<Type<any>>> = new InjectionToken<Observable<Type<any>>>('header-content-component', {
	factory: () => {
    const store = inject(Store);
    return store.select(IndexState.editingCharacterName).pipe(
      distinctUntilChanged(),
      map(value => value ? WriteComponent : ReadComponent)
    )
  }
})
