import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScaleSubListPage } from './scale-sub-list.page';

describe('ScaleSubListPage', () => {
  let component: ScaleSubListPage;
  let fixture: ComponentFixture<ScaleSubListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleSubListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScaleSubListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
