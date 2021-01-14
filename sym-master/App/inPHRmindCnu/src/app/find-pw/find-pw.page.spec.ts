import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindPwPage } from './find-pw.page';

describe('FindPwPage', () => {
  let component: FindPwPage;
  let fixture: ComponentFixture<FindPwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindPwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
