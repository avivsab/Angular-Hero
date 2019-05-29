import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HeroesData } from './data-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient,private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesURL).pipe(
      tap(_ => this.log('Fetched the heroes')),catchError(this.handleError<Hero[]>('getHeroes', []))) 
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HeroesData.find(hero => hero.id===id));
  } 
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private heroesURL = 'api/heroes';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
