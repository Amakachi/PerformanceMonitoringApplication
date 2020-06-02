import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { AuthenticationGuard } from './guard/authentication.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: 'app',
    loadChildren: () => import('../app/pages/pages.module')
    .then(m => m.PagesModule),
    canActivate: [AuthenticationGuard]
  },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ChartsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }


