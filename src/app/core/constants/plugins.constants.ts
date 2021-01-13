import { DatepickerOptionsInterface } from '@app/interfaces';

export const DatePickerOptions: DatepickerOptionsInterface = {
    icon: 'icon-calendar',
    startDate: new Date(),
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    assumeNearbyYear: true
};