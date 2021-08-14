import { EntriesModule } from './pages/entries/entries.module';
import { CategoriesModule } from './pages/categories/categories.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'entries', loadChildren: () => EntriesModule },
    { path: 'categories', loadChildren: () => CategoriesModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
