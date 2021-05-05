import { ToastService } from '../../services/toast/toast.service';
import { AuthConstants } from './../../config/auth-constants';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  postData = {
    username: '',
    password: '',
  };

  public errorMessages = {
    username: [{ type: 'required', message: 'O usuário é obrigatório' }],
    password: [
      { type: 'required', message: 'A senha é obrigatória' },
      {
        type: 'minlength',
        message: 'A senha deve conter, no mínimo, 8 caracteres',
      },
    ],
  };

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public submit() {
    this.loginAction();
  }

  loginAction() {
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        if (res.token) {
          this.storageService.store(AuthConstants.AUTH, res.token);
          this.storageService.store('user', res.user);
          this.router.navigate(['home/resume']);
        } else {
          this.toastService.presentToast('Usuário ou senha incorreto.');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Falha na conexão. Tente novamente!');
      }
    );
  }
}
