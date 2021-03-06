import { User } from './../_models/user';
import { AdminService } from './../_services/Admin.service';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";

import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Organizations } from "../_models/Organizations";

@Injectable()
export class GetUserInOrgResolver implements Resolve<User[]>{
    AdminService: any;
    constructor(private adminService:AdminService,private router:Router,private alertify:AlertifyService){}
    resolve(route:ActivatedRouteSnapshot):Observable<User[]>{
        return this.adminService.getUserinOrg(route.params['nameid']).pipe(
          catchError(error => {
              this.alertify.error('Error occured when retriving the data');
              this.router.navigate(['']);
              return of(null);

          })
        )
    }
}
