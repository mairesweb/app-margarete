import { DetailPaperModalPage } from './../../modals/detail-paper-modal/detail-paper-modal.page';
import { ToastService } from './../../services/toast/toast.service';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.page.html',
  styleUrls: ['./investment.page.scss'],
})
export class InvestmentPage implements OnInit {

  public papers: any;
  public allPapers: any;
  public isItemAvailable = false;

  constructor(
    private http: HttpService,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.http.get('papers').subscribe(
      (res: any) => {
        if (res) {
          this.allPapers = res;
          this.initializePapers();
        } else {
          this.toastService.presentToast('Ops! Ocorreu algum erro, tente novamente mais tarde ou entre em contato conosco.');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Falha na conexão. Tente novamente!');
      }
    );
  }

  async viewPaper(paper: any) {
    const modal = await this.modalController.create({
      component: DetailPaperModalPage,
      cssClass: 'my-custom-class',
      componentProps: paper
    });
    return await modal.present();
  }

  initializePapers(){
    this.papers = this.allPapers;
  }

  filterPapers(ev: any) {
    this.initializePapers();

    const query = ev.target.value;

    if (query && query.trim() != '') {
      this.papers = this.allPapers.filter((item) => {
        return (item.code.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
      })
    }
  }

}
