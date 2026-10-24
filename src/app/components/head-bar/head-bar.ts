import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-head-bar',
  styleUrl: './head-bar.css',
  templateUrl: './head-bar.html',
})
export class HeadBar {
  @Input() title = '';
  @Input() favoritesCount = 0;
}