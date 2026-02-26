import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Navbar} from '../../components/navbar/navbar';
import {Hero} from '../../components/hero/hero';
import {About} from '../../components/about/about';
import {Characters} from '../../components/characters/characters';
import {Screenshots} from '../../components/screenshots/screenshots';
import {Contact} from '../../components/contact/contact';
import charactersData from '../../../../../public/data/characters.json';
import gamesData from '../../../../../public/data/games.json';

interface CharacterData {
  id: string;
  name: string;
  imageSrc: string;
  description: string;
}

interface GameData {
  id: string;
  title: string;
  imageSrc: string;
  date: string;
  description: string;
  categories: string[];
  detail: string;
  downloadLink: string;
  playLink: string;
  longDescription: string;
  privacyPolicyLink: string;
  screenshots: string[];
  characters: string[];
}

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, Navbar, Hero, About, Characters, Screenshots, Contact],
  templateUrl: './game-page.html',
})
export class GamePage implements OnInit {
  game?: GameData;
  games: GameData[] = gamesData;
  filteredCharacters: CharacterData[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const characters = charactersData as CharacterData[];

    this.game = this.games.find((p) => p.id === id);

    if (this.game) {
      document.title = `${this.game.title} | mustakuusi`;
      this.filteredCharacters = characters.filter((c) =>
        this.game?.characters.includes(c.id)
      );
    }
  }
}
