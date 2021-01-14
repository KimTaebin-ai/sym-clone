import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IRBPage } from './irb.page';

describe('IRBPage', () => {
  let component: IRBPage;
  let fixture: ComponentFixture<IRBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IRBPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IRBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
