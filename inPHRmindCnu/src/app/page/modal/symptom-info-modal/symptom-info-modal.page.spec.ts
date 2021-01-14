import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymptomInfoModalPage } from './symptom-info-modal.page';

describe('SymptomInfoModalPage', () => {
  let component: SymptomInfoModalPage;
  let fixture: ComponentFixture<SymptomInfoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomInfoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymptomInfoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
