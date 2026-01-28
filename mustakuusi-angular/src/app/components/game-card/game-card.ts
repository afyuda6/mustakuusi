import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {InViewDirective} from '../../directives/in-view.directive';
import {getImageUrl} from '../../../utils';

interface Game {
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
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, InViewDirective, RouterLink],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  @Input() game!: Game;
  isVisible = false;

  getImageUrl(path: string) {
    return getImageUrl(path);
  }
}
