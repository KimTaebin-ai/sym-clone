import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../../mind-module/mind.manager';
import {PageInfoService} from '../../../../services/page-info.service';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent implements OnInit {
  @Output('fabOpened')

  fabChanged = new EventEmitter<any>();
  fabButtonOpened = false;

  constructor(
      private navController: NavController,
      private mindManager: MindManager,
      private pageInfoService: PageInfoService
  ) { }

  ngOnInit() {
  }

  openFabButton(){
    if (this.fabButtonOpened === false){
      this.fabButtonOpened = true;
      this.fabChanged.emit(true);
    }else{
      this.fabButtonOpened = false;
      this.fabChanged.emit(false);
    }
  }

  goToPage(url, title, type) {
    if (type === 'TAB') {
      this.pageInfoService.moveToTab(url, title).then(data => {
        this.navController.navigateRoot([url]);
      });
    } else {
      this.pageInfoService.getToOtherPage('/main/main/home', url, title).then(() => {
        this.navController.navigateRoot([url]);
      });
    }
  }

}
