import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {PatternDrinkingPage} from './pattern-drinking.page';


describe('PatternDrinkingPage', () => {
  let component: PatternDrinkingPage;
  let fixture: ComponentFixture<PatternDrinkingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternDrinkingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternDrinkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
