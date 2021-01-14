import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertPsychologicalScalePage } from './insert-psychological-scale.page';

describe('InsertPsychologicalScalePage', () => {
  let component: InsertPsychologicalScalePage;
  let fixture: ComponentFixture<InsertPsychologicalScalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPsychologicalScalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertPsychologicalScalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
