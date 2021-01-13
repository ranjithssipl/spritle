// Library elements
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

const screenfull = require('screenfull');
const browser = require('jquery.browser');
declare var $: any;

//--
import { InterfaceComponent } from '@app/interfaces';
import { UserblockService } from '../sidebar/userblock/userblock.service';
import { SettingsService, MenuService } from '@app/core';
import { AuthService } from '@app/auth';
import { AppPreferences } from '@app/models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends InterfaceComponent implements OnInit {

    navCollapsed = true; // for horizontal layout
    menuItems = []; // for horizontal layout

    isNavSearchVisible: boolean;
    @ViewChild('fsbutton') fsbutton;  // the fullscreen button

    appPreferences: AppPreferences = new AppPreferences();

    constructor(
        private router: Router,
        public menu: MenuService,
        public userblockService: UserblockService,
        public settingsService: SettingsService,
        public authService: AuthService
    ) {
        super();

        // get menu items
        this.menuItems = menu.getMenu();
    }

    ngOnInit() {
        this.subscriptions['appPreferences'] = this.settingsService.appPreferences$.subscribe(settings => {
            this.appPreferences = settings || new AppPreferences();

        })

        this.isNavSearchVisible = false;
        if (browser.msie) { // Not supported under IE
            this.fsbutton.nativeElement.style.display = 'none';
        }
    }

    toggleUserBlock(event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    }

    openNavSearch(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    }

    setNavSearchVisible(stat: boolean) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    }

    getNavSearchVisible() {
        return this.isNavSearchVisible;
    }

    toggleCollapsedSideabar() {
        this.appPreferences['isCollapsed'] = ! this.appPreferences['isCollapsed'];
    }

    isCollapsedText() {
        return  this.appPreferences['isCollapsedText'];
    }

    toggleFullScreen(event) {

        if (screenfull.enabled) {
            screenfull.toggle();
        }
        // Switch icon indicator
        let el = $(this.fsbutton.nativeElement);
        if (screenfull.isFullscreen) {
            el.children('em').removeClass('fa-expand').addClass('fa-compress');
        }
        else {
            el.children('em').removeClass('fa-compress').addClass('fa-expand');
        }
    }

    //Logout User
    logout() {
        this.authService.logout()
    }

}
