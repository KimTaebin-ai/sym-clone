import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermModalPage } from './term-modal.page';

describe('TermModalPage', () => {
  let component: TermModalPage;
  let fixture: ComponentFixture<TermModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
