import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(translate: TranslateService, private storage: LocalStorageService) {
    let language = localStorage.getItem('language');
    if(language){
      translate.setDefaultLang(language);
      translate.use(language);
    } else {
      translate.setDefaultLang('sr');
      translate.use('sr');
    }
  }
}