import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../../mind-module/mind.manager';

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
      private mindManager: MindManager
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

  goToPage(url) {
    const pageInfo: any = {
      url: '',
      title: ''
    };
    if (url === '/calendar') {
      pageInfo.title = '캘린더';
    }
    this.mindManager.setPageInfo(pageInfo);
    this.navController.navigateRoot([url]);
  }

}
