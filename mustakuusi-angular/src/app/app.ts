import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Marquee} from './components/marquee/marquee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Marquee, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
