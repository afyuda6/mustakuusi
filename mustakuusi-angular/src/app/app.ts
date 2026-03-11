import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Marquee} from './components/marquee/marquee';
import {Footer} from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Marquee, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
