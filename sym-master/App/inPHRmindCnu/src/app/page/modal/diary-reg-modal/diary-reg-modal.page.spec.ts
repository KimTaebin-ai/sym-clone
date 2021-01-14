import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiaryRegModalPage } from './diary-reg-modal.page';

describe('DiaryRegModalPage', () => {
  let component: DiaryRegModalPage;
  let fixture: ComponentFixture<DiaryRegModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryRegModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiaryRegModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
