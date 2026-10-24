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


  @Input() autos: Auto[] = [];
  @Input() favorites: Auto[] = [];

 
  @Output() onSelectCar = new EventEmitter<Auto>();
  @Output() onToggleFavorite = new EventEmitter<Auto>();

  
  searchText = '';
  sortBy = 'none';
  onlyFavorites = false;

  
  get selectedAutos(): Auto[] {
    
    let result = this.autos.filter((auto) =>
      (auto.brand + ' ' + auto.model).toLowerCase().includes(this.searchText.toLowerCase())
    );

    
    if (this.onlyFavorites) {
      result = result.filter((auto) => this.favorites.includes(auto));
    }

  
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