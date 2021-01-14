import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MindReportPage } from './mind-report.page';

describe('MindReportPage', () => {
  let component: MindReportPage;
  let fixture: ComponentFixture<MindReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MindReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
