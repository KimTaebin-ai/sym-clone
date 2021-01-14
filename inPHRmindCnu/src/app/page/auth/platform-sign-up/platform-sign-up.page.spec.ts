import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlatformSignUpPage } from './platform-sign-up.page';

describe('PlatformSignUpPage', () => {
  let component: PlatformSignUpPage;
  let fixture: ComponentFixture<PlatformSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
