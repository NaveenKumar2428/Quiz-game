import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteComponent } from './component/complete/complete.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { path:'', component: HomeComponent },

  { path:'quiz-Game', component: QuizComponent },

  { path:'finish', component: CompleteComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
