import { ToastService } from './../../services/toast/toast.service';
import { HttpService } from './../../services/http/http.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-paper-modal',
  templateUrl: './detail-paper-modal.page.html',
  styleUrls: ['./detail-paper-modal.page.scss'],
})
export class DetailPaperModalPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private http: HttpService,
    private toastService: ToastService
  ) {
    this.paper.bazin = (1 / (5 / 100)) * this.navParams.get('dpa');
    this.paper.graham = Math.sqrt(22.5 * (this.navParams.get('lpa') * this.navParams.get('vpa')));

    this.http.get('papers/' + this.paper.code + '/updatePaper').subscribe(
      (res: any) => {
        if (res) {
          this.paper = res;
          this.paper.bazin = (1 / (5 / 100)) * this.paper.dpa;
          this.paper.graham = Math.sqrt(22.5 * (this.paper.lpa * this.paper.vpa));
        } else {
          this.toastService.presentToast('Ops! Ocorreu algum erro, tente novamente mais tarde ou entre em contato conosco.');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Falha na conexão. Usaremos dados mais antigos.');
      }
    );
  }

  public paper = this.navParams.data;

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  showInfo(info: string) {
    this.toastService.presentToast(info);
  }

}
