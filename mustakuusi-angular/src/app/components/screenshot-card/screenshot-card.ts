import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InViewDirective} from '../../directives/in-view.directive';
import {getImageUrl} from '../../../utils';

@Component({
  selector: 'app-screenshot-card',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  templateUrl: './screenshot-card.html',
  styleUrl: './screenshot-card.css',
})
export class ScreenshotCard {
  @Input() title!: string;
  @Input() imageSrc!: string;

  isVisible = false;

  getImageUrl(path: string) {
    return getImageUrl(path);
  }
}
