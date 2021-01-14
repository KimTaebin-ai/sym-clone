import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PwChangePage } from './pw-change.page';

describe('PwChangePage', () => {
  let component: PwChangePage;
  let fixture: ComponentFixture<PwChangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwChangePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PwChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
