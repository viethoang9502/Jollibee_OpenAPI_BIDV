import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EwalletService } from '../../services/ewallet.service';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { EwalletDTO } from 'src/app/dtos/user/ewallet.dto';
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/services/share.data.service';

@Component({
  selector: 'app-ewallet',
  templateUrl: './ewallet.component.html',
  styleUrls: ['./ewallet.component.scss']
})
export class EwalletComponent implements OnInit {
  userEnteredNumber: number = 0;
  userResponse?: UserResponse | null;
  ewalletForm: FormGroup;
  
  token:string = '';
  public transactionDescription: string = '';


  constructor(
    private sharedDataService: SharedDataService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
    private ewalletService: EwalletService  // Assuming you need this service as well
  ) {
    this.ewalletForm = this.formBuilder.group({
      facebookAccountId: ['', Validators.required],
      // Add other form controls similar to your UserProfileComponent
      // For example:

      googleAccountId: ['', Validators.required],
      // other form controls...
    });
  }

  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.ewalletForm = this.formBuilder.group({
      facebookAccountId: [null, Validators.required],
      // other form controls...
    });

  }
  getGoogleAccountId(): number | null {
    return this.userResponse?.google_account_id ?? null;
  }
  saveFacebookAccountId1(): void {
    if (this.ewalletForm.valid) {
      const enteredFacebookAccountId = +this.ewalletForm.get('facebookAccountId')?.value;
      // ... other logic
  
      // Update the shared data service
      this.sharedDataService.changeFacebookAccountId(enteredFacebookAccountId);
    }
  }
  saveFacebookAccountId(): void {
  if (this.ewalletForm.valid) {
    // Parse the entered value as a number
    const enteredFacebookAccountId = +this.ewalletForm.get('facebookAccountId')?.value;

    // Retrieve and parse the current Facebook Account ID as a number
    // If it's not available, default to 0
    const currentFacebookAccountId = this.userResponse?.facebook_account_id
      ? +this.userResponse.facebook_account_id
      : 0;

    // Perform the mathematical addition
    const newFacebookAccountId = currentFacebookAccountId + enteredFacebookAccountId;

    // Create an EwalletDTO with the new Facebook Account ID
    const ewalletDTO: EwalletDTO = new EwalletDTO({ facebook_account_id: newFacebookAccountId });

    this.userService.updateUserDetail1(this.token, ewalletDTO)
      .subscribe({
        next: (response) => {
          // Update the local storage with the new Facebook Account ID
          if (this.userResponse) {
            this.userResponse.facebook_account_id = newFacebookAccountId;
            this.userService.saveUserResponseToLocalStorage(this.userResponse);
          }
          // Optionally navigate the user to a different page or show a success message
        },
        error: (error) => {
          // Handle the error scenario, for instance, showing an error message
          alert(error.error.message);
        }
      });
      this.callCreateEwallet();
  } else {
    // Handle form validation errors
  }
}

callCreateEwallet(): void {
  const link = 'hehe'; // Define your link or get it from a form input
  this.ewalletService.createConfirm(link).subscribe({
    next: (response) => {
      this.transactionDescription = response.AdditionalInfo.detailedError.description;
      // Here you can handle the display logic or other actions based on the response
    },
    error: (error) => {
      console.error('Error occurred:', error);
    }
  });
}
askForOTP(): void {
  const otp = prompt('Please enter your OTP:', '');
  if (otp === '123456') {
    Swal.fire({
      title: 'Success!',
      text: 'OTP verified successfully',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Invalid OTP',
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }
}
subtractFacebookAccountId(): void {
  if (this.ewalletForm.valid) {
    // Parse the entered value as a number
    const enteredFacebookAccountId = +this.ewalletForm.get('facebookAccountId')?.value;

    // Retrieve and parse the current Facebook Account ID as a number
    // If it's not available, default to 0
    const currentFacebookAccountId = this.userResponse?.facebook_account_id
      ? +this.userResponse.facebook_account_id
      : 0;

    // Perform the mathematical subtraction
    const newFacebookAccountId = currentFacebookAccountId - enteredFacebookAccountId;

    // Ensure the result is not negative, or handle it according to your needs
    if (newFacebookAccountId < 0) {
      alert("Không đủ tiền.");
      return;
    }

    // Create an EwalletDTO with the new Facebook Account ID
    const ewalletDTO: EwalletDTO = new EwalletDTO({ facebook_account_id: newFacebookAccountId });

    this.userService.updateUserDetail1(this.token, ewalletDTO)
      .subscribe({
        next: (response) => {
          // Update the local storage with the new Facebook Account ID
          if (this.userResponse) {
            this.userResponse.facebook_account_id = newFacebookAccountId;
            this.userService.saveUserResponseToLocalStorage(this.userResponse);
          }
          // Optionally navigate the user to a different page or show a success message
        },
        error: (error) => {
          // Handle the error scenario, for instance, showing an error message
          alert(error.error.message);
        }
      });this.callCreateEwallet();
  } else {
    // Handle form validation errors
  }
}

}
