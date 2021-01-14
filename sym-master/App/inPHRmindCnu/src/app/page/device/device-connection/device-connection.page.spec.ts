import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceConnectionPage } from './device-connection.page';

describe('DeviceConnectionPage', () => {
  let component: DeviceConnectionPage;
  let fixture: ComponentFixture<DeviceConnectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceConnectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
