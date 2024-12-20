import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerStateService } from 'src/app/core/services/customer-state.service';
import { ShopifyService } from 'src/app/core/services/shopify.service';
import { tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  formSubmitted:boolean = false;
  contactForm!: FormGroup<any>;
  loading:boolean = false;
  loginError:boolean = false;
  customerAccessToken:string | null | any = null;
  @Output() loginEvent: EventEmitter<any> = new EventEmitter()
  showPassword: boolean = false;
  constructor(private fb:FormBuilder,
              private shopifyService:ShopifyService,
              private customerStateService:CustomerStateService
  ) {  }
  
  submittedFormData:any;
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      password:['', Validators.required],
      email:['', [Validators.required, Validators.email]]
    })
    
  }
  // Accessors for form controls in your template
  get email() { return this.contactForm?.get('email'); }
  get password() { return this.contactForm?.get('password'); }
 
  // login(){
  //     const email = this.contactForm.get('email')?.value;
  //     const password = this.contactForm.get('password')?.value;
  //     if (this.contactForm.controls['password'].valid && 
  //         this.contactForm.controls['email'].valid) {
  //       // Form is valid, proceed with submission
  //       this.loading = true
  //       this.shopifyService.customerLogin(email,password)
  //       .subscribe({
  //         next: (res)=>{
  //           console.log(res,"customer logged in")
  //           try {
  //             this.customerAccessToken = res.data.customerAccessTokenCreate.customerAccessToken
  //             localStorage.setItem('customerAccessToken',JSON.stringify(this.customerAccessToken))
  //             this.loginError = this.customerAccessToken === null ? true : false 
  //             this.loading = false
  //             if(!this.loginError){
  //               this.loginEvent.emit({isLoggedIn: true, 
  //                 customerAccessToken:this.customerAccessToken.accessToken}
  //               )
  //             }
  //           } catch (error) {
  //             this.loading=false;
  //           }
  //         },
  //         error: (err)=>{
  //           console.log(err,"customer login failed")
  //           this.loading = false

  //         }
  //       });
  //     } else {
  //       // Form is invalid, mark controls as touched to display errors
  //       this.contactForm.markAllAsTouched();
  //       this.loading = false
  //     }
    
  // }

  // Login function using CustomerStateService
  login(): void {
    const email = this.contactForm.get('email')?.value;
    const password = this.contactForm.get('password')?.value;

    if (this.contactForm.valid) {
      // Form is valid, proceed with submission
      this.loading = true;

      // Use CustomerStateService to perform login
      this.customerStateService.login(email, password)
        .pipe(
          tap((response: any) => {
            this.customerAccessToken = localStorage.getItem('customerAccessToken');
            this.loading = false;

            if (this.customerAccessToken) {
              this.loginError = false;
              this.loginEvent.emit({
                isLoggedIn: true,
                customerAccessToken: JSON.parse(this.customerAccessToken)
              });
            } else {
              this.loginError = true;
            }
          })
        )
        .subscribe({
          error: (err:any) => {
            console.error('Customer login failed', err);
            this.loading = false;
            this.loginError = true;
          }
        });
    } else {
      // Form is invalid, mark controls as touched to display errors
      this.contactForm.markAllAsTouched();
      this.loading = false;
    }
  }
  handleShowPassword(){
    const pw = document.getElementById('passwordInput') as any
    pw.type == 'password' ? pw.type = 'text' : pw.type = 'password'
    this.showPassword = !this.showPassword
  }
}

