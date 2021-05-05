import { HttpService } from '../../services/http/http.service';
import { ToastService } from '../../services/toast/toast.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
})
export class GoalPage implements OnInit {

  public errorMessages = {
    nickname: [],
    percentage: [
      { type: 'required', message: 'A porcentagem é obrigatória' }
    ],
    category: [
      { type: 'required', message: 'A categoria é obrigatória' }
    ],
    /*account: [
      { type: 'required', message: 'A conta é obrigatória' }
    ],*/
  };

  goalForm = this.formBuilder.group({
    nickname: [''],
    percentage: ['', Validators.required],
    category: ['', Validators.required],
    // account: ['', Validators.required]
  });

  public categories: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.http.get('categories/sub_categories').subscribe(
      (res: any) => {
        if (res) {
          this.categories = res;
        } else {
          this.toastService.presentToast('Ops! Ocorreu algum erro, tente novamente mais tarde ou entre em contato conosco.');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Falha na conexão. Tente novamente!');
      }
    );
  }

  get name() {
    return this.goalForm.get('name');
  }

  get percentage() {
    return this.goalForm.get('percentage');
  }

  get category() {
    return this.goalForm.get('category');
  }

  public submit() {
    this.http.post(
      'sub_categories/' + this.goalForm.value.category + '/users_accounts/1/transactions',
      this.goalForm.value).subscribe(
      (res: any) => {
        if (res.id) {
          this.goalForm.reset();
          this.toastService.presentToast('Transação adicionada com sucesso!');
        } else {
          this.toastService.presentToast('Ops! Ocorreu algum erro, tente novamente mais tarde ou entre em contato conosco.');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Falha na conexão. Tente novamente!');
      }
    );
  }

}
