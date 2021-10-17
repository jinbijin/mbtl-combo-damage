import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { CharacterSelectionComponent } from "./character-selection.component";
import { ReadComponent } from "./components/read.component";
import { WriteComponent } from "./components/write.component";

@NgModule({
  declarations: [CharacterSelectionComponent, ReadComponent, WriteComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxsModule],
  exports: [CharacterSelectionComponent]
})
export class CharacterSelectionModule { }
