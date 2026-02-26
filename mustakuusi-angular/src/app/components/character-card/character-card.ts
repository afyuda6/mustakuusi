import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {InViewDirective} from '../../directives/in-view.directive';
import {getImageUrl} from '../../../utils';

interface Character {
  id?: string;
  name: string;
  imageSrc: string;
  description: string;
}

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, InViewDirective, RouterLink],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  @Input() character!: Character;
  isVisible = false;

  getImageUrl(path: string) {
    return getImageUrl(path);
  }
}
