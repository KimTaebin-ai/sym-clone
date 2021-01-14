import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LifelogPage } from './lifelog.page';

describe('LifelogPage', () => {
  let component: LifelogPage;
  let fixture: ComponentFixture<LifelogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifelogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LifelogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
