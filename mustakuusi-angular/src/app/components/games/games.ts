import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameCard} from '../game-card/game-card';
import {InViewDirective} from '../../directives/in-view.directive';

interface Game {
  id: string;
  title: string;
  imageSrc: string;
  date: string;
  description: string;
  categories: string[];
  detail: string;
  downloadLink?: string;
  playLink?: string;
}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, InViewDirective, GameCard],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class Games {
  @Input() gameSection!: string;
  @Input() games: Game[] = [];

  isVisible = false;
}
