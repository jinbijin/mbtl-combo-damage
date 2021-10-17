import { Component, HostBinding, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SaveCharacter, UndoEdit } from "src/app/state/index/index.actions";
import { IndexState } from "src/app/state/index/index.state";
import { Link } from "src/app/state/types/link.type";

@Component({
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  formControl: FormControl;

  @HostBinding('class.container') get containerClass(): boolean {
    return true;
  }

  @Select(IndexState.saveLink) saveLink$: Observable<Link>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.formControl = new FormControl(this.store.selectSnapshot(IndexState.selectedCharacter)?.name);
  }

  undoEdit(): void {
    this.store.dispatch(new UndoEdit());
  }

  saveCharacter(link: Link): void {
    this.store.dispatch(new SaveCharacter({ name: this.formControl.value, link }));
  }
}
