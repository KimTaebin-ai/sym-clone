import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PanicDiaryPage } from './panic-diary.page';

describe('PanicDiaryPage', () => {
  let component: PanicDiaryPage;
  let fixture: ComponentFixture<PanicDiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanicDiaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PanicDiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
