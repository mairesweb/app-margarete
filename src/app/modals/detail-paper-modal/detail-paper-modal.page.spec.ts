import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPaperModalPage } from './detail-paper-modal.page';

describe('DetailPaperModalPage', () => {
  let component: DetailPaperModalPage;
  let fixture: ComponentFixture<DetailPaperModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPaperModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPaperModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
