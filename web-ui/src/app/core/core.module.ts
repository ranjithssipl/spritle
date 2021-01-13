import { NgModule, Optional, SkipSelf, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';

// --
import { throwIfAlreadyLoaded } from '@app/core/module-import-guard';
import { SettingsService } from '@app/core/settings/settings.service';
import { ThemesService } from '@app/core/themes/themes.service';
import { MenuService } from '@app/core/menu/menu.service';
import { RouterStorageService } from '@app/core/router/router-storage.service';

export function settingsServiceFactory(settings: SettingsService) {
    return () => settings.loadAppData();
}

export const appInitializer = {
    provide: APP_INITIALIZER,
    useFactory: settingsServiceFactory,
    deps: [SettingsService],
    multi: true
}

// Loading locale data for en-IN
import localeEnIN from '@angular/common/locales/en-IN';
registerLocaleData(localeEnIN);

@NgModule({
    imports: [
        RouterModule
    ],
    providers: [
        SettingsService,
        ThemesService,
        MenuService,
        appInitializer,
        RouterStorageService
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

