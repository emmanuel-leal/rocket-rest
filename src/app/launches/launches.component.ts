import { Component, OnInit } from '@angular/core';
import { LaunchesApiClient } from '../apis/LaunchesApiClient';
import { LaunchesClass } from '../interfaces/LaunchesClass';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.sass']
})
export class LaunchesComponent implements OnInit {

  public urlLaunches: string = "https://api.spacexdata.com/v3/launches";
  public launches?:LaunchesClass[];

  constructor(private launchesApi:LaunchesApiClient) { }

  ngOnInit(): void {
    this.getLaunches();
  }



  private getLaunches():void{
    this.launchesApi.get<LaunchesClass[]>(this.urlLaunches).subscribe( data =>{
      this.launches = data;
    });
  }

}
