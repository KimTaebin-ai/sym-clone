import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateIrbPage } from './update-irb.page';

describe('UpdateIrbPage', () => {
  let component: UpdateIrbPage;
  let fixture: ComponentFixture<UpdateIrbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIrbPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateIrbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
