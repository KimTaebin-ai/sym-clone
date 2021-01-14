import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatternDringingPage } from './pattern-dringing.page';

describe('PatternDringingPage', () => {
  let component: PatternDringingPage;
  let fixture: ComponentFixture<PatternDringingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternDringingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternDringingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
