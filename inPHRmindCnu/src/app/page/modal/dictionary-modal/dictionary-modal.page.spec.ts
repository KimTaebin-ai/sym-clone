import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DictionaryModalPage } from './dictionary-modal.page';

describe('DictionaryModalPage', () => {
  let component: DictionaryModalPage;
  let fixture: ComponentFixture<DictionaryModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DictionaryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
