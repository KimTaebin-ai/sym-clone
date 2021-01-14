import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SleepsPage } from './sleeps.page';

describe('SleepsPage', () => {
  let component: SleepsPage;
  let fixture: ComponentFixture<SleepsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SleepsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
