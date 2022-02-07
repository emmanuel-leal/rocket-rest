import { Component, OnInit } from '@angular/core';
import { LaunchesClass } from '../interfaces/LaunchesClass';
import { RocketClass } from '../interfaces/RocketClass';
import { RocketApiClient } from '../apis/';
import { LaunchesApiClient } from '../apis/LaunchesApiClient';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FinalDataClass } from '../interfaces/FinalDataClass';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.sass']
})
export class RocketComponent implements OnInit {

  private urlLaunches: string = "https://api.spacexdata.com/v3/launches";
  private launches?: LaunchesClass[];
  private urlRockets: string = 'https://api.spacexdata.com/v3/rockets';
  private rockets?: RocketClass[];
  public finalData?:FinalDataClass;

  constructor(private rocketApi: RocketApiClient, private launchesApi: LaunchesApiClient,private route: ActivatedRoute) {
    

  }

  ngOnInit(): void {
    this.getLaunchesAndRockets(this.route.snapshot.queryParams['flight_number'],this.route.snapshot.queryParams['rocket_id']);
  }

  private getLaunchesAndRockets(flight_number:string,rocket_id:string) {
    forkJoin({
      launchesResponse: this.launchesApi.get<LaunchesClass[]>(this.urlLaunches),
      rocketResponse: this.rocketApi.get<RocketClass[]>(this.urlRockets)
    })
      .subscribe(({ launchesResponse, rocketResponse }) => {
        this.launches = launchesResponse;
        this.rockets = rocketResponse;

        let launchData = this.filterLaunchById(flight_number,launchesResponse);
        let rocketData = this.filterRocketById(rocket_id,rocketResponse);

        this.finalData = {
          details: launchData.details,
          flight_number: launchData.flight_number,
          launch_date_unix: launchData.launch_date_unix,
          mission_name: launchData.mission_name,
          rocket: {
            rocket_id: rocket_id,
            active:rocketData.active,
            company:rocketData.company,
            cost_per_launch:rocketData.cost_per_launch,
            rocket_name:rocketData.rocket_name
          }
        };

        console.log(this.finalData);
      });
  }

  private filterRocketById(rocketId:string,rocketList:RocketClass[]): RocketClass{
    let rocketFiltered = rocketList.filter( rocket => rocket.rocket_id == rocketId);
    return rocketFiltered[0];
  }

  private filterLaunchById(launchId:string,launchList:LaunchesClass[]):LaunchesClass{
    let launchFiltered = launchList.filter( launch => launch.flight_number == Number(launchId));
    return launchFiltered[0]
  }

}