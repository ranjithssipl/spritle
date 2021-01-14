const baseUrl = "http://34.73.77.76/";

export const appDetails = {
    name: 'DEV-OPS',
    description: '',
    year: ((new Date()).getFullYear())
}

// get ApiURL
export function GetApiurl(path: string, params?: Object) {


    let url = baseUrl + path;
    if (params instanceof Object) {
        url += '?';

        Object.entries(params).forEach(([param, value]) => {
            url += `${encodeURIComponent(param)}=${encodeURIComponent(value)}&`;
        })
    }

    return url;
}

export const authTokenId = 'id_token';


export const defaultAppPreferences = {
    applicationTheme: 'A',

    isFixed: true,
    isCollapsed: false,
    isBoxed: false,
    isRTL: false,
    horizontal: false,
    isFloat: false,
    asideHover: false,
    theme: null,
    asideScrollbar: false,
    isCollapsedText: false,
    useFullLayout: false,
    hiddenFooter: false,
    offsidebarOpen: false,
    asideToggled: false,
    viewAnimation: 'ng-fadeInUp',
};

// Image specifications
const validImageTypes = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
const validImageSize = 1048576;

export function GetValidimageTypes() {
    return { 'validType': validImageTypes, 'validSize': validImageSize }
}
