import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  faMagnifyingGlass = faMagnifyingGlass;

  // data received from the parent (App)
  @Input() autos: Auto[] = [];
  @Input() favorites: Auto[] = [];

  // events sent to the parent (App)
  @Output() onSelectCar = new EventEmitter<Auto>();
  @Output() onToggleFavorite = new EventEmitter<Auto>();

  // what the user chose in the search area
  searchText = '';
  sortBy = 'none';
  onlyFavorites = false;

  // the list shown on the page: it is recalculated each time the user changes something
  get selectedAutos(): Auto[] {
    // 1) search by brand or model
    let result = this.autos.filter((auto) =>
      (auto.brand + ' ' + auto.model).toLowerCase().includes(this.searchText.toLowerCase())
    );

    // 2) keep only the favorites if the box is checked
    if (this.onlyFavorites) {
      result = result.filter((auto) => this.favorites.includes(auto));
    }

    // 3) sort by price
    if (this.sortBy === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }

  isFavorite(auto: Auto): boolean {
    return this.favorites.includes(auto);
  }
}