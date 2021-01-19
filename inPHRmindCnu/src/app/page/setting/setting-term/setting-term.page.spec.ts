import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingTermPage } from './setting-term.page';

describe('SettingTermPage', () => {
  let component: SettingTermPage;
  let fixture: ComponentFixture<SettingTermPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTermPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingTermPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
