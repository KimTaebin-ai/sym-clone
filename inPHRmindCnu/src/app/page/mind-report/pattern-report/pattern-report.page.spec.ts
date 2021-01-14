import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatternReportPage } from './pattern-report.page';

describe('PatternReportPage', () => {
  let component: PatternReportPage;
  let fixture: ComponentFixture<PatternReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
