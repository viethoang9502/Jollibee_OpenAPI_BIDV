import { EwalletDTO } from "src/app/dtos/user/ewallet.dto";
import { Role } from "src/app/models/role";

export interface UserResponse {
    token(token: any, updateDTO: EwalletDTO): unknown;
    id: number;
    fullname: string;
    address:string;
    is_active: boolean;
    date_of_birth: Date;
    facebook_account_id: number;
    google_account_id: number;
    role: Role;    
}