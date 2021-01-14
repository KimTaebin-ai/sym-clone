import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatternMealPage } from './pattern-meal.page';

describe('PatternMealPage', () => {
  let component: PatternMealPage;
  let fixture: ComponentFixture<PatternMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternMealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
