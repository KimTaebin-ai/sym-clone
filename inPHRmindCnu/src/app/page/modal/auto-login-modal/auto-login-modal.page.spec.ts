import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoLoginModalPage } from './auto-login-modal.page';

describe('AutoLoginModalPage', () => {
  let component: AutoLoginModalPage;
  let fixture: ComponentFixture<AutoLoginModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoLoginModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoLoginModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
