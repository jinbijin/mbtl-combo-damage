import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { CharacterSelectionComponent } from "./character-selection.component";

@NgModule({
  declarations: [CharacterSelectionComponent],
  imports: [CommonModule, NgxsModule],
  exports: [CharacterSelectionComponent]
})
export class CharacterSelectionModule { }
