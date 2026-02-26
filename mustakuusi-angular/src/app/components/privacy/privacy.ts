import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
})
export class Privacy {
  @Input() id?: string;
  @Input() title?: string;
  isIndonesian = false;

  setLanguage(lang: 'en' | 'id') {
    this.isIndonesian = lang === 'id';
  }
}
