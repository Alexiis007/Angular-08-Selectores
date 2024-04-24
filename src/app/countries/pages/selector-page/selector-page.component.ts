import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountries } from '../../interfaces/country.interface';
import { Observable, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent implements OnInit{
  constructor(private formBuilder : FormBuilder, private countriesService : CountriesService){}

  public countriesByRegion : SmallCountries[] = [];

  public borders : SmallCountries[] = []


  public myForm : FormGroup = this.formBuilder.group({
    region:['',Validators.required],
    country:['',Validators.required],
    borders:['',Validators.required],
  }) 

  get regions():Region[]{
    return this.countriesService.regions
  }

  public onRegionChange():void{
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap(()=>this.myForm.get('country')!.setValue('')),
      tap(() => this.borders = []),
      //switchmap tranforma la respuesta del suscribe en base a otro suscribe
      //En este caso se lleva la respuesta y la manda a un metodo con un suscribe diferente retornadolo
      //aqui mismo
      switchMap(resRegion => this.countriesService.getCountriesByRegions(resRegion))
    )
    .subscribe(region=>{
      this.countriesByRegion = region;
    })
  }

  public onCountryChange():void{
    //Cuando el country cambie
    this.myForm.get('country')!.valueChanges
    .pipe(
      //El border obtiene datos
      tap(()=>this.myForm.get('borders')!.setValue('')),
      //El filter filtra la respuesta tomando encuenta la misma
      //en este caso si la respuesta es menor a 0 no con tinua con la peticion
      filter((value : string)=> value.length > 0),
      //switchmap tranforma la respuesta del suscribe en base a otro suscribe
      //En este caso se lleva la respuesta y la manda a un metodo con un suscribe diferente retornadolo
      //aqui mismo
      switchMap((alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode)),
      switchMap(resCountri=>this.countriesService.getCountryBordersByCodes(resCountri.borders))
    )
    .subscribe(country=>{
      this.borders = country; 
    });
  }


  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }
}
