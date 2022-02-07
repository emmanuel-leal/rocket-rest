import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchesComponent } from './launches/launches.component';
import { RocketComponent } from './rocket/rocket.component';

const routes: Routes = [
  {path:"",component: LaunchesComponent},
  {path:"rocket",component: RocketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
