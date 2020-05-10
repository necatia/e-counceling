import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  user;
  constructor(private dialog:MatDialog,
              private router: Router,
              private authService:AuthService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.authService.userSubject$.subscribe(user=>{this.user=user;})
     
    this.route.fragment.subscribe(f => {
      const element = document.querySelector("#" + f)
      if (element) element.scrollIntoView({ block: 'start',  behavior: 'smooth' })
    });
  

  }

  startCounceling(){
    console.log(this.user)
    if(this.user.uid){
      this.router.navigate(['/dashboard']);
      return;
    }
 
    const dialogRef = this.dialog.open(LoginComponent) 
    .afterClosed()
    .subscribe((result:any)=>{
      if (result) {
        let user = result.user
        this.authService.getUserById(user.uid)
        .subscribe((user:any)=>{
          console.log(user)
          if(user.type=="therapist") this.router.navigate(['t-dashboard']);
          if(user.type=="user") this.router.navigate(['dashboard']);
        })
        
      };
    })
 
  }
 
}
