import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HeroesData } from './data-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient,private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesURL); 
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HeroesData.find(hero => hero.id===id));
  } 
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private heroesURL = 'api/heroes';
}
