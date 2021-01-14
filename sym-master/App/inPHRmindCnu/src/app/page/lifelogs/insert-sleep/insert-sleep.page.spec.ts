import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertSleepPage } from './insert-sleep.page';

describe('InsertSleepPage', () => {
  let component: InsertSleepPage;
  let fixture: ComponentFixture<InsertSleepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertSleepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertSleepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
