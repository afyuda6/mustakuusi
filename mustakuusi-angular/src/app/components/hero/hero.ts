import {Component, Input, OnInit} from '@angular/core';
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
export class Hero implements OnInit {
  @Input() title!: string;
  @Input() description?: string;
  @Input() downloadLink?: string;
  @Input() playLink?: string;
  @Input() imageUrl!: string;

  isVisible = false;
  currentPath = '';

  isHomePage = false;
  isCharacterPage = false;
  isGamePage = false;

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
  }

  removeHash() {
    setTimeout(() => {
      history.replaceState(null, '', window.location.pathname);
    }, 200);
  }
}
