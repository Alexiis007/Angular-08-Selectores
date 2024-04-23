import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent {
  constructor(private formBuilder : FormBuilder){}

  public myForm : FormGroup = this.formBuilder.group({
    region:['',Validators.required],
    country:['',Validators.required],
    borders:['',Validators.required],
  }) 
}
