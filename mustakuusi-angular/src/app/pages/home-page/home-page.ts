import {Component, OnInit} from '@angular/core';
import {Navbar} from '../../components/navbar/navbar';
import {Hero} from '../../components/hero/hero';
import {About} from '../../components/about/about';
import {Games} from '../../components/games/games';
import {Characters} from '../../components/characters/characters';
import {Contact} from '../../components/contact/contact';
import characters from '../../../../../public/data/characters.json';
import games from '../../../../../public/data/games.json';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Navbar, Hero, About, Games, Characters, Contact],
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit {
  games = games;
  characters = characters;

  ngOnInit(): void {
    document.title = `mustakuusi`;
  }
}
