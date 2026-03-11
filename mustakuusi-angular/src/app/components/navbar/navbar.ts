import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  menuOpen = false;
  currentPath = '';

  isHomePage = false;
  isGamePage = false;
  isCharacterPage = false;

  constructor(private router: Router, private elRef: ElementRef) {}

  ngOnInit(): void {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    let path = this.router.url.replace(baseHref, '/').split('#')[0];
    this.currentPath = path;

    this.isHomePage = path === '/';
    this.isCharacterPage = path.startsWith('/character');
    this.isGamePage =
      !this.isHomePage &&
      !this.isCharacterPage &&
      !path.includes('privacy-policy');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        path = event.urlAfterRedirects.replace(baseHref, '/').split('#')[0];
        this.currentPath = path;
        this.isHomePage = path === '/';
        this.isCharacterPage = path.startsWith('/character');
        this.isGamePage =
          !this.isHomePage &&
          !this.isCharacterPage &&
          !path.includes('privacy-policy');
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:mousedown', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  handleClickOutside(event: Event) {
    if (this.menuOpen && !this.elRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }

  removeHash() {
    setTimeout(() => {
      history.replaceState(null, '', window.location.pathname);
    }, 200);
  }
}
