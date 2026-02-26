import {Routes} from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import {GamePage} from './pages/game-page/game-page';
import {CharacterPage} from './pages/character-page/character-page';
import {PrivacyPolicyPage} from './pages/privacy-policy-page/privacy-policy-page';
import {EmptyPage} from './pages/empty-page/empty-page';

export const routes: Routes = [
  {path: '', component: HomePage},
  {path: ':id', component: GamePage},
  {path: 'character/:id', component: CharacterPage},
  {path: 'privacy-policy/:id', component: PrivacyPolicyPage},
  {path: '**', component: EmptyPage}
];
