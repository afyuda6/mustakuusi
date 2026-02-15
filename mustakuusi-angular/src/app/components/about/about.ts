import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {InViewDirective} from '../../directives/in-view.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, InViewDirective, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  @Input() about!: string;
  @Input() itemDescription!: string;
  @Input() privacyPolicyLink?: string;

  isVisible = false;
  isGamePage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';

    this.isGamePage = this.router.url.replace(baseHref, '/').split('#')[0] !== '/';

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const path = event.urlAfterRedirects.replace(baseHref, '').split('#')[0];
        this.isGamePage = path !== '/';
      }
    });
  }
}
