import { AuthConstants } from './../../config/auth-constants';
import { ToastService } from './../../services/toast/toast.service';
import { StorageService } from './../../services/storage/storage.service';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.page.html',
  styleUrls: ['./extract.page.scss'],
})
export class ExtractPage implements OnInit {

  private month: any;
  public transactions: any;
  public monthsOfUser: any;
  public total: any;
  private postData: any;

  public months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  constructor(
    private http: HttpService,
    private storage: StorageService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.doRefresh();
      }
    });
  }

  ngOnInit() {
    this.getMonths();
  }

  getData() {
    this.storage.get(AuthConstants.AUTH).then(userData => {
      this.postData = {
        token: userData,
        month: this.month
      };
      this.http.post('transactions/getByMonth', this.postData).subscribe(
        (res: any) => {
          if (res) {
            this.transactions = res;
            this.total = this.getTotal();
          } else {
            this.toastService.presentToast('Ops! Ocorreu algum erro, tente novamente mais tarde ou entre em contato conosco.');
          }
        },
        (error: any) => {
          this.toastService.presentToast('Falha na conexão. Tente novamente!');
        }
      );
    });
  }

  getMonths() {
    this.storage.get(AuthConstants.AUTH).then(userData => {
      this.postData = {
        token: userData
      };
      this.http.post('transactions/getMonths', this.postData).subscribe(
        (res: any) => {
          if (res) {
            this.month = res[0].ref;
            this.getData();
            this.monthsOfUser = res;
          } else {
            this.toastService.presentToast('Ops! Ocorreu algum erro, tente novamente mais tarde ou entre em contato conosco.');
          }
        },
        (error: any) => {
          this.toastService.presentToast('Falha na conexão. Tente novamente!');
        }
      );
    });
  }

  getTotal() {
    return this.transactions.reduce((a, b) => a + (b['value'] || 0), 0);
  }

  monthChange(ev: any) {
    this.month = ev.detail.value;

    this.getData();
  }

  changeTransaction(transaction: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        transaction
      }
    };
    this.router.navigate(['/home/transaction'], navigationExtras);
  }

  doRefresh(event?: any) {
    this.getData();
    if (event) { event.target.complete(); }
  }

  deleteTransaction(id: any) {
    this.storage.get(AuthConstants.AUTH).then(userData => {
      this.postData = {
        token: userData
      };
      this.http.post('transactions/delete/' + id, this.postData).subscribe(
        (res: any) => {
          if (res) {
            this.getData();
            this.toastService.presentToast('Transação removida com sucesso!');
          } else {
            this.toastService.presentToast('Ops! Ocorreu algum erro, tente novamente mais tarde ou entre em contato conosco.');
          }
        },
        (error: any) => {
          this.toastService.presentToast('Falha na conexão. Tente novamente!');
        }
      );
    });
  }

}
