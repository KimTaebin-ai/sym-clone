import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareManagementPage } from './care-management.page';

describe('CareManagementPage', () => {
  let component: CareManagementPage;
  let fixture: ComponentFixture<CareManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
