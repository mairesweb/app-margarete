import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { ToastService } from '../../services/toast/toast.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  public errorMessages = {
    name: [
      { type: 'required', message: 'O nome é obrigatório' }
    ],
    type: [
      { type: 'required', message: 'O tipo é obrigatório' }
    ],
    value: [
      { type: 'required', message: 'O valor é obrigatório' }
    ],
    date: [
      { type: 'required', message: 'A data é obrigatória' }
    ],
    category: [
      { type: 'required', message: 'A categoria é obrigatória' }
    ],
    /*account: [
      { type: 'required', message: 'A conta é obrigatória' }
    ],*/
  };

  public categories: any;
  public empty: string;
  public transaction: any;

  transactionForm = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    value: ['', Validators.required],
    date: ['', Validators.required],
    category: ['', Validators.required],
    // account: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private toastService: ToastService,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.transaction = this.router.getCurrentNavigation().extras.state.transaction;
        this.listCategories(this.transaction.sub_categories.category_id);
        this.transaction.value = Math.abs(this.transaction.value);
      } else {
        this.transaction = false;
      }
    });
  }

  get name() {
    return this.transactionForm.get('name');
  }

  get type() {
    return this.transactionForm.get('type');
  }

  get value() {
    return this.transactionForm.get('value');
  }

  get date() {
    return this.transactionForm.get('date');
  }

  get category() {
    return this.transactionForm.get('category');
  }

  get account() {
    return this.transactionForm.get('account');
  }

  public submit() {
    if (this.transaction) {
      this.transactionForm.value.id = this.transaction.id;
    }

    this.httpService.post(
      'sub_categories/' + this.transactionForm.value.category + '/users_accounts/1/transactions',
      this.transactionForm.value).subscribe(
      (res: any) => {
        if (res.id) {
          this.transactionForm.reset();
          this.toastService.presentToast('Transação adicionada com sucesso!');
        } else if (res[0]) {
          this.transactionForm.reset();
          this.toastService.presentToast('Transação editada com sucesso!');

          const navigationExtras: NavigationExtras = {
            state: {
              refresh: true
            }
          };

          this.router.navigate(['/home/extract'], navigationExtras);
        } else {
          this.toastService.presentToast('Ops! Ocorreu algum erro, tente novamente mais tarde ou entre em contato conosco.');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Falha na conexão. Tente novamente!');
      }
    );
  }

  categoryChanged(ev: any) {
    this.empty = null;
    if (ev.detail.value) {
      this.listCategories(ev.detail.value);
    }
  }

  listCategories(type: any) {
    this.categoriesService.listAll(type).subscribe(
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

  ngOnInit() {
  }

}
