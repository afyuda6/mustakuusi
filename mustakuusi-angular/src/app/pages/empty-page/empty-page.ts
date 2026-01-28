import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-empty-page',
  standalone: true,
  templateUrl: './empty-page.html',
})
export class EmptyPage implements OnInit {
  ngOnInit(): void {
    document.title = `mustakuusi`;
  }
}
