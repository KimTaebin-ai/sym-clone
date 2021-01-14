import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubScaleListPage } from './sub-scale-list.page';

describe('SubScaleListPage', () => {
  let component: SubScaleListPage;
  let fixture: ComponentFixture<SubScaleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubScaleListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubScaleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
