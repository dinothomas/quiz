import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './views/register/register.component'
import { QuestionsComponent } from './views/questions/questions.component'
import { RankListComponent } from './views/rank-list/rank-list.component';

const routes: Routes = [
  { path: '',  redirectTo: '/register', pathMatch: 'full' },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'questions',
    pathMatch: 'full',
    component: QuestionsComponent
  },
  {
    path: 'rank-list',
    pathMatch: 'full',
    component: RankListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
