import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmotionInfoModalPage } from './emotion-info-modal.page';

describe('EmotionInfoModalPage', () => {
  let component: EmotionInfoModalPage;
  let fixture: ComponentFixture<EmotionInfoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionInfoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmotionInfoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
