import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./emp/emp.module').then(m => m.EmpModule)},
];


const rootRouting = RouterModule.forRoot([
], { useHash: false });

@NgModule({
  imports: [RouterModule.forRoot(routes),rootRouting],
  exports: [RouterModule]
})
export class AppRoutingModule { }
