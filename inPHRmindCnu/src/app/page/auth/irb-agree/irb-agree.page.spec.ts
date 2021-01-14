import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IrbAgreePage } from './irb-agree.page';

describe('IrbAgreePage', () => {
  let component: IrbAgreePage;
  let fixture: ComponentFixture<IrbAgreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrbAgreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IrbAgreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
