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
  // getHero(id: number): Observable<Hero> {
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HeroesData.find(hero => hero.id===id));
  // } 
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
  getHero(id: number): Observable<Hero> {
    const URL = `${this.heroesURL}/${id}`;
    return this.http.get<Hero>(URL).pipe(
      tap(_=> this.log(`Fetched hero with id num ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }
  updateHero(hero:Hero):Observable<any> {
    return this.http.put(this.heroesURL, hero, httpOptions).pipe(
      tap(_ => this.log(`Update hero id number ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  } 
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesURL, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  // addHero(hero:Hero): Observable<Hero> {
  //     return this.http.post<Hero>(this.heroesURL, hero, httpOptions).pipe(
  //       tap((newHero: Hero) => this.log(`Added hero w/ with id ${newHero.id)`)),
  //       catchError(this.handleError<Hero>('addHero'))
  //     )
  //   }
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number'? hero : hero.id;
    const URL = `${this.heroesURL}/${id}`;
    return this.http.delete<Hero>(URL, httpOptions).pipe(
      tap(_ => this.log(`Delete hero with id number ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }
  }
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }


