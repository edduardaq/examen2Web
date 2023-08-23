import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChoferesComponent } from './choferes/choferes/choferes.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'choferes',
    component: ChoferesComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
