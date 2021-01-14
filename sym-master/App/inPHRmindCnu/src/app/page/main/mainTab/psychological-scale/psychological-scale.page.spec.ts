import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PsychologicalScalePage } from './psychological-scale.page';

describe('PsychologicalScalePage', () => {
  let component: PsychologicalScalePage;
  let fixture: ComponentFixture<PsychologicalScalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologicalScalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PsychologicalScalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
