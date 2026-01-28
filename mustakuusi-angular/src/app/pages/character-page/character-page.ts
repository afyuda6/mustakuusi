import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Navbar} from '../../components/navbar/navbar';
import {Hero} from '../../components/hero/hero';
import {Games} from '../../components/games/games';
import {Contact} from '../../components/contact/contact';
import charactersData from '../../../data/characters.json';
import gamesData from '../../../data/games.json';

interface CharacterData {
  id: string;
  name: string;
  imageSrc: string;
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
  selector: 'app-character-page',
  standalone: true,
  imports: [CommonModule, Navbar, Hero, Games, Contact],
  templateUrl: './character-page.html',
})
export class CharacterPage implements OnInit {
  character?: CharacterData;
  filteredGames: GameData[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const characters = charactersData as CharacterData[];
    const games = gamesData as GameData[];

    this.character = characters.find((p) => p.id === id);

    if (this.character) {
      document.title = `${this.character.name} | mustakuusi`;
      this.filteredGames = games.filter((g) =>
        g.characters.includes(this.character!.id)
      );
    }
  }
}
