import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { getImageUrl } from '../../../utils';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  getImageUrl(path: string) {
    return getImageUrl(path);
  }
}
