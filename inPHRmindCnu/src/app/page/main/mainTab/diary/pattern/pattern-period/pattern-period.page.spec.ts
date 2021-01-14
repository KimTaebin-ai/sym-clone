import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {PatternPeriodPage} from './pattern-period.page';


describe('PatternPeriodPage', () => {
  let component: PatternPeriodPage;
  let fixture: ComponentFixture<PatternPeriodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternPeriodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternPeriodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
