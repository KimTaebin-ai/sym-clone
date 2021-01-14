import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatternCaffeinePage } from './pattern-caffeine.page';

describe('PatternCaffeinePage', () => {
  let component: PatternCaffeinePage;
  let fixture: ComponentFixture<PatternCaffeinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternCaffeinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternCaffeinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
