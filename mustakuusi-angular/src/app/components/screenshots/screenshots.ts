import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScreenshotCard} from '../screenshot-card/screenshot-card';
import {InViewDirective} from '../../directives/in-view.directive';

@Component({
  selector: 'app-screenshots',
  standalone: true,
  imports: [CommonModule, InViewDirective, ScreenshotCard],
  templateUrl: './screenshots.html',
  styleUrl: './screenshots.css',
})
export class Screenshots {
  @Input() screenshots: string[] = [];
  @Input() title!: string;
  isVisible = false;
}
