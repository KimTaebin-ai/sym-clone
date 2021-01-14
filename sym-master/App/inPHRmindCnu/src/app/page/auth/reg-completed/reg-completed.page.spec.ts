import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegCompletedPage } from './reg-completed.page';

describe('RegCompletedPage', () => {
  let component: RegCompletedPage;
  let fixture: ComponentFixture<RegCompletedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegCompletedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
