import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertPulsePage } from './insert-pulse.page';

describe('InsertPulsePage', () => {
  let component: InsertPulsePage;
  let fixture: ComponentFixture<InsertPulsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPulsePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertPulsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
