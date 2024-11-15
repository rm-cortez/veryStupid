import { Routes } from '@angular/router';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { KnownComponent } from './components/known/known.component';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [
    {path:'',component:MainComponentComponent},
    { path:'known-for' , component:KnownComponent},
    { path:'cards' , component:CardComponent },
];
