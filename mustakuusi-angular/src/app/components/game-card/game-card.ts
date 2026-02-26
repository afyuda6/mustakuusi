import {Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
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
export class GameCard implements OnInit, OnDestroy {
  @Input() game!: Game;
  isVisible = false;

  countdown = signal('');
  private timer: any;

  getImageUrl(path: string) {
    return getImageUrl(path);
  }

  ngOnInit() {
    if (this.game.date) {
      this.updateCountdown();
      this.timer = setInterval(() => this.updateCountdown(), 1000 * 60 * 60);
    }
  }

  updateCountdown() {
    const now = new Date().getTime();
    const release = new Date(this.game.date).getTime();
    const diff = release - now;

    if (diff <= 0) {
      this.countdown.set('');
      clearInterval(this.timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.countdown.set(`${days} hari lagi`);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  get formattedDate() {
    return new Date(this.game.date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    });
  }
}
