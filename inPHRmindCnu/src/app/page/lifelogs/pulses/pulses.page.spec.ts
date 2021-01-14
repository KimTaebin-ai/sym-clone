import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PulsesPage } from './pulses.page';

describe('PulsesPage', () => {
  let component: PulsesPage;
  let fixture: ComponentFixture<PulsesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulsesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PulsesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
