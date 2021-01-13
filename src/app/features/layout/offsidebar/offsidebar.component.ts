import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

//--
import { InterfaceComponent } from '@app/interfaces';
import { SettingsService, ThemesService } from '@app/core';
import { AppPreferences } from '@app/models';

@Component({
    selector: 'app-offsidebar',
    templateUrl: './offsidebar.component.html',
    styleUrls: ['./offsidebar.component.scss']
})
export class OffsidebarComponent extends InterfaceComponent implements OnInit, OnDestroy {

    currentTheme: any;
    clickEvent = 'click.offsidebar';
    $doc: any = null;
    appPreferences: AppPreferences = new AppPreferences();

    constructor(public settingsService: SettingsService, public themes: ThemesService) {
        super();

        this.currentTheme = themes.getDefaultTheme();
    }

    ngOnInit() {
        this.subscriptions['appPreferences'] = this.settingsService.appPreferences$.subscribe(settings => {
            this.appPreferences = settings || new AppPreferences();
        })

        this.anyClickClose();
    }

    setTheme() {
        this.themes.setTheme(this.currentTheme);
    }

    anyClickClose() {
        this.$doc = $(document).on(this.clickEvent, (e) => {
            if (!$(e.target).parents('.offsidebar').length) {
                this.appPreferences['offsidebarOpen'] = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.$doc)
            this.$doc.off(this.clickEvent);
    }
}
