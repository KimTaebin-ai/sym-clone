import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatternSmokingPage } from './pattern-smoking.page';

describe('PatternSmokingPage', () => {
  let component: PatternSmokingPage;
  let fixture: ComponentFixture<PatternSmokingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternSmokingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternSmokingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
