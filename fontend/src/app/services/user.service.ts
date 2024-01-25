import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../../environments/environment';
import { HttpUtilService } from './http.util.service';
import { UserResponse } from '../responses/user/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';
import { EwalletDTO } from '../dtos/user/ewallet.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }

  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService
  ) { }

  register(registerDTO: RegisterDTO):Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {    
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
  getUserDetail(token: string) {
    return this.http.post(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  
  updateUserDetail(token: string, updateUserDTO: UpdateUserDTO) {
    debugger
    let userResponse = this.getUserResponseFromLocalStorage();        
    return this.http.put(`${this.apiUserDetail}/${userResponse?.id}`,updateUserDTO,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  updateUserDetail1(token: string, ewalletDTO: EwalletDTO) {
    debugger
    let userResponse = this.getUserResponseFromLocalStorage();        
    return this.http.put(`${this.apiUserDetail}/${userResponse?.id}`,ewalletDTO,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);  
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      localStorage.setItem('user', userResponseJSON);  
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }
  
  getUserResponseFromLocalStorage(): UserResponse | null {
    try {
      const userResponseJSON = localStorage.getItem('user');
      if (userResponseJSON == null) {
        return null;
      }
      const userResponse: UserResponse = JSON.parse(userResponseJSON);
      console.log('User response retrieved from local storage.');
  
      // Truy xuất google_account_id và facebook_account_id
      const googleAccountId = userResponse.google_account_id;
      const facebookAccountId = userResponse.facebook_account_id;
  
      console.log('Google Account ID:', googleAccountId);
      console.log('Facebook Account ID:', facebookAccountId);
  
      return userResponse; // Trả về đối tượng UserResponse
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null;
    }
  }
  
  removeUserFromLocalStorage():void {
    try {
      // Remove the user data from local storage using the key
      localStorage.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }
  
}
