import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlarmPage } from './alarm.page';

describe('AlarmPage', () => {
  let component: AlarmPage;
  let fixture: ComponentFixture<AlarmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlarmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
