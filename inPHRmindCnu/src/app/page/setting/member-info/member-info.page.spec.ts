import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberInfoPage } from './member-info.page';

describe('MemberInfoPage', () => {
  let component: MemberInfoPage;
  let fixture: ComponentFixture<MemberInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
