import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageHeaderPage } from './page-header.page';

describe('PageHeaderPage', () => {
  let component: PageHeaderPage;
  let fixture: ComponentFixture<PageHeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHeaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
