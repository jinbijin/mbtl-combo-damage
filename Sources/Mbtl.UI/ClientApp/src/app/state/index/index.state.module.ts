import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { IndexState } from "./index.state";

@NgModule({
  imports: [NgxsModule.forRoot([IndexState])],
  exports: [NgxsModule]
})
export class IndexStateModule { }
