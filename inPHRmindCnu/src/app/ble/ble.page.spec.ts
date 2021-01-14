import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlePage } from './ble.page';

describe('BlePage', () => {
  let component: BlePage;
  let fixture: ComponentFixture<BlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
