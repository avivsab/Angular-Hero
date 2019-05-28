import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HeroesData } from './data-heroes'
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Hero[]{
    return HeroesData
  }
}
