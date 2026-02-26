import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterCard} from '../character-card/character-card';
import {InViewDirective} from '../../directives/in-view.directive';

interface Character {
  id: string;
  name: string;
  imageSrc: string;
  description: string;
}

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, InViewDirective, CharacterCard],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  @Input() characterSection!: string;
  @Input() characters: Character[] = [];

  isVisible = false;
}
