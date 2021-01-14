import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatternExPage } from './pattern-ex.page';

describe('PatternExPage', () => {
  let component: PatternExPage;
  let fixture: ComponentFixture<PatternExPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternExPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternExPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
