import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SnsSignUpPage } from './sns-sign-up.page';

describe('SnsSignUpPage', () => {
  let component: SnsSignUpPage;
  let fixture: ComponentFixture<SnsSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnsSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SnsSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
