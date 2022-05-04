import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedTheme = "default";

  themeOptions = [{ value: 'default', label: 'Light' }, { value: 'dark', label: 'Dark'}];

  constructor(private translateService: TranslateService, private themeService: NbThemeService) {
    this.translateService.setDefaultLang('en');
  }

  updateTheme(): void {
    this.themeService.changeTheme(this.selectedTheme);
  }
}
