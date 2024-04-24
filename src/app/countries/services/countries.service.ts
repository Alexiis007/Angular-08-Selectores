import { Injectable } from '@angular/core';
import { Country, Region, SmallCountries } from '../interfaces/country.interface';
import { Observable, combineLatest, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http : HttpClient) { }

  private baseURL : string = 'https://restcountries.com/v3.1';

  //private  _guionBajo metodo de seguridad
  private _regions : Region[] = [Region.Africa,Region.Americas,Region.Asia,Region.Europa,Region.Oceania];

  get regions():Region[]{
    return [...this._regions]
  }

  public getCountriesByRegions(region : Region):Observable<SmallCountries[]>{
    if(!region) return of([]);
    return this.http.get<Country[]>(`${this.baseURL}/region/${region}?fields=cca3,name,borders`)
    .pipe(
      //El map tranforma la info retornada en lo que queramos el of igual pero antes de la peticion :)
      map(resCountries => resCountries.map(resCountries => ({
        name:resCountries.name.common,
        cca3:resCountries.cca3,
        borders:resCountries.borders ?? []
      }))),
      tap(res => console.log(res)
      )
    )
  }

  public getCountryByAlphaCode(alphaCode : string):Observable<SmallCountries>{
    return this.http.get<Country>(`${this.baseURL}/alpha/${alphaCode}?fields=cca3,name,borders`)
    //transformacion de Country a smallCountry
    .pipe(
      map(country => ({
        name:country.name.common,
        cca3:country.cca3,
        borders:country.borders ?? []
      }))
    )
  }

  public getCountryBordersByCodes(borders : string[]):Observable<SmallCountries[]>{
    
    if(!borders || borders.length == 0 ) return of([]) 

    const dataRequest : Observable<SmallCountries>[] = [];

    borders.forEach(code => {
      const res = this.getCountryByAlphaCode(code);
      dataRequest.push(res);
    });

    return combineLatest(dataRequest);
  }
}
