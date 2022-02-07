import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RocketApiClient extends HttpClient {

    constructor(httpHandler: HttpHandler) {
        super(httpHandler)
    }


    public override get<T>(url: string) {
        return super.get<T>(url);
    }

}
