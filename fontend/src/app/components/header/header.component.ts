import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userResponse?:UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;

  constructor(
    private userService: UserService,       
    private tokenService: TokenService,    
    private router: Router,
  ) {
    
   }
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();    
    this.userResponse = this.userService.getUserResponseFromLocalStorage(); 
    const googleId = this.getGoogleAccountId();
    const facebookId = this.getFacebookAccountId();
  
    if (googleId) {
      console.log('Google Account ID:', googleId);
    }
  
    if (facebookId) {
      console.log('Facebook Account ID:', facebookId);
    }
  }  

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }



  handleItemClick(index: number): void {
    //alert(`Clicked on "${index}"`);
    if(index === 0) {
      debugger
      this.router.navigate(['/user-profile']);                      
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();    
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item    
  }
getGoogleAccountId(): number | null {
  if (this.userResponse && this.userResponse.google_account_id) {
    return this.userResponse.google_account_id;
  }
  return null;
}

getFacebookAccountId(): number | null {
  if (this.userResponse && this.userResponse.facebook_account_id) {
    return this.userResponse.facebook_account_id;
  }
  return null;
}

  
  setActiveNavItem(index: number) {    
    this.activeNavItem = index;
    //alert(this.activeNavItem);
  }  
}
