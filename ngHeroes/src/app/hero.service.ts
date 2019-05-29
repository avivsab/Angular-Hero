import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HeroesData } from './data-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
    this.messageService.add('HeroService fetched heroes');
    return of(HeroesData); 
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HeroesData.find(hero => hero.id===id));
  } 
}
