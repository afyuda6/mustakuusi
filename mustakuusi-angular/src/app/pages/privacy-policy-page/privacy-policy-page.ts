import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Navbar} from '../../components/navbar/navbar';
import {Privacy} from '../../components/privacy/privacy';
import {Contact} from '../../components/contact/contact';
import gamesData from '../../../../../public/data/games.json';

interface GameBrief {
  id: string;
  title: string;
}

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [CommonModule, Navbar, Privacy, Contact],
  templateUrl: './privacy-policy-page.html',
})
export class PrivacyPolicyPage implements OnInit {
  game?: GameBrief;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    const games = gamesData as GameBrief[];
    this.game = games.find((p) => p.id === id);

    if (this.game) {
      document.title = `${this.game.title} | mustakuusi`;
    }
  }
}
