import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConstants } from './../../config/auth-constants';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  postData = {
    name: '',
    tel: '',
    email: '',
    username: '',
    password: '',
  };

  public errorMessages = {
    name: [{ type: 'required', message: 'O nome é obrigatório' }],
    tel: [{ type: 'required', message: 'O telefone é obrigatório' }],
    email: [
      { type: 'required', message: 'O e-mail é obrigatório' },
      { type: 'email', message: 'Preencha o e-mail corretamente.' },
    ],
    username: [{ type: 'required', message: 'O usuário é obrigatório' }],
    password: [
      { type: 'required', message: 'A senha é obrigatória' },
      {
        type: 'minlength',
        message: 'A senha deve conter, no mínimo, 8 caracteres',
      },
    ],
  };

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    tel: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  get name() {
    return this.signupForm.get('name');
  }

  get tel() {
    return this.signupForm.get('tel');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  public submit() {
    this.signUpAction();
  }

  signUpAction() {
    this.authService.signup(this.signupForm.value).subscribe(
      (res: any) => {
        if (res.token) {
          this.storageService
            .store(AuthConstants.AUTH, res.token)
            .then(() => {
              this.router.navigate(['home/resume']);
            });
        } else {
          this.toastService.presentToast('Dados já existem, tente outra informação.');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Falha na conexão. Tente novamente!');
      }
    );
  }
}
