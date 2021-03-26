import { Component, Input, OnInit } from '@angular/core';
import {ApiModels} from '../models/models';

interface WeatherDataVM
{
  sunset_time: string;
  temp_celsius: number;
  temp_min: number;
  temp_max: number;
  termical_sense: number;
  cityName: string;


}

@Component({
  selector: 'app-componentsweather',
  templateUrl: './componentsweather.component.html',
  styleUrls: ['./componentsweather.component.scss'],
})
export class ComponentsweatherComponent implements OnInit {

  constructor() { }

  @Input()
  City: string;

  @Input()
  Country: string;

  apiResponse:ApiModels.ApiWeatherResponse;
  vm: WeatherDataVM;

  ngOnInit() {

    this.apiResponse = <ApiModels.ApiWeatherResponse>{};
    this.vm = <WeatherDataVM>{};
    this.getWeatherData();
  }

  getWeatherData()
  {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.City},${this.Country}&appid=d33b42614d9096239c3fc0b9940058d2`)
    .then(response=> response.json())
    .then((data: ApiModels.ApiWeatherResponse)=>{

      this.vm.cityName = data.name;
      this.vm.sunset_time = new Date(data.sys.sunset * 1000).toLocaleDateString();
      this.vm.temp_celsius = data.main.temp - 273.15;
      this.vm.temp_max = data.main.temp_max - 273.15;
      this.vm.temp_min = data.main.temp_min - 273.15;
      this.vm.termical_sense = data.main.feels_like - 273,15;
    });

  }

}
