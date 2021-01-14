import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PsychologicalPage } from './psychological.page';

describe('PsychologicalPage', () => {
  let component: PsychologicalPage;
  let fixture: ComponentFixture<PsychologicalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologicalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PsychologicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
