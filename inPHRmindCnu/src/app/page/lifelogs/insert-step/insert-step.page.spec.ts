import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertStepPage } from './insert-step.page';

describe('InsertStepPage', () => {
  let component: InsertStepPage;
  let fixture: ComponentFixture<InsertStepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertStepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
