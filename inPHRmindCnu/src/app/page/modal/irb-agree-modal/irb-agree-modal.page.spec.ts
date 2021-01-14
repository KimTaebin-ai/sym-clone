import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IrbAgreeModalPage } from './irb-agree-modal.page';

describe('IrbAgreeModalPage', () => {
  let component: IrbAgreeModalPage;
  let fixture: ComponentFixture<IrbAgreeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrbAgreeModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IrbAgreeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
