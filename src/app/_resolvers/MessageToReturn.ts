import { MessageService } from './../_services/Message.service';
import { Inbox } from './../_models/Inbox';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";


import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from '../_services/auth.service';
import { MessageForReturn } from '../_models/MessageForReturn';

@Injectable()
export class MessageToReturn implements Resolve<MessageForReturn[]>{

    constructor(private router:Router,private alertify:AlertifyService,private authService:AuthService,private messageService:MessageService){}

    resolve(route:ActivatedRouteSnapshot):Observable<MessageForReturn[]>{

        return this.messageService.getMessageDetail(parseInt(this.authService.decodedToken.nameid),+route.params['nameid']).pipe(
          catchError(error => {
              this.alertify.error('Error occured when retriving the data');
              this.router.navigate(['']);
              return of(null);

          })
        )
    }
}
