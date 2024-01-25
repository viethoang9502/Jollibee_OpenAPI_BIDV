export class EwalletDTO {
    facebook_account_id: number;      
   
    constructor(data: any) {
        this.facebook_account_id = data.facebook_account_id;
    
    }
}