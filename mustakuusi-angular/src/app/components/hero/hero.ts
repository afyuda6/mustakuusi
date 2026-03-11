import {Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {InViewDirective} from '../../directives/in-view.directive';
import {getImageUrl} from '../../../utils';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() description?: string;
  @Input() downloadLink?: string;
  @Input() playLink?: string;
  @Input() imageUrl!: string;
  @Input() date?: string;

  isVisible = false;
  currentPath = '';

  isHomePage = false;
  isCharacterPage = false;
  isGamePage = false;

  countdown = signal('');
  private timer: any;

  constructor(private router: Router) {}

  getImageUrl(path: string) {
    return getImageUrl(path);
  }

  getHeroImage() {
    return getImageUrl(this.imageUrl);
  }

  ngOnInit(): void {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';

    const path = this.router.url.replace(baseHref, '/').split('#')[0];
    this.currentPath = path;

    this.isHomePage = path === '/';
    this.isCharacterPage = path.startsWith('/character');
    this.isGamePage =
      !this.isHomePage &&
      !this.isCharacterPage &&
      !path.includes('privacy-policy');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const pathAfterRedirect = event.urlAfterRedirects.replace(baseHref, '').split('#')[0];
        this.currentPath = pathAfterRedirect;

        this.isHomePage = pathAfterRedirect === '/' || pathAfterRedirect === '';
        this.isCharacterPage = pathAfterRedirect.startsWith('/character');
        this.isGamePage =
          !this.isHomePage &&
          !this.isCharacterPage &&
          !pathAfterRedirect.includes('privacy-policy');
      }
    });

    if (this.date) {
      this.updateCountdown();
      this.timer = setInterval(() => this.updateCountdown(), 1000 * 60 * 60);
    }
  }

  removeHash() {
    setTimeout(() => {
      history.replaceState(null, '', window.location.pathname);
    }, 200);
  }

  updateCountdown() {
    const now = new Date().getTime();
    let release = null;
    if (this.date) {
      release = new Date(this.date).getTime();
    }
    const diff = release ? release - now : 0;

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
}
