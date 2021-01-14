import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatternPhysiologyPage } from './pattern-physiology.page';

describe('PatternPhysiologyPage', () => {
  let component: PatternPhysiologyPage;
  let fixture: ComponentFixture<PatternPhysiologyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternPhysiologyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternPhysiologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
