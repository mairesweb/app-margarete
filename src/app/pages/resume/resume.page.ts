import { ToastService } from './../../services/toast/toast.service';
import { AuthConstants } from './../../config/auth-constants';
import { StorageService } from './../../services/storage/storage.service';
import { HttpService } from './../../services/http/http.service';
import { Label } from 'ng2-charts';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.page.html',
  styleUrls: ['./resume.page.scss'],
})
export class ResumePage implements OnInit {

  public totals = {
    receitas: 0,
    despesas: 0,
    total: 0
  };

  constructor(
    private menu: MenuController,
    private http: HttpService,
    private storage: StorageService,
    private toastService: ToastService
  ) { }

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'right'
    },
    plugins: {
      datalabels: {
        color: 'white',
        labels: {
          title: {
              font: {
                  size: 8,
                  weight: 'bold'
              }
          }
        },
        formatter: (value, ctx) => {
          // const label = ctx.chart.data.labels[ctx.dataIndex];
          const label = ['', '']
          return label;
        },
      }
    }
  };

  public doughnutChartLabels: Label[] = ['Receitas', 'Despesas'];
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartPlugins = [pluginDataLabels];
  public doughnutChartColors = [
    {
      backgroundColor: ['#36a2eb', '#ff6384']
    },
  ];

  ngOnInit() {
    this.storage.get(AuthConstants.AUTH).then(userData => {
      this.http.post('transactions/getTotals', {token: userData}).subscribe(
        (res: any) => {
          if (res) {
            this.totals = res;
            this.doughnutChartData = [this.totals.receitas, this.totals.despesas];
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

  openMenu() {
    this.menu.open('main-menu');
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
