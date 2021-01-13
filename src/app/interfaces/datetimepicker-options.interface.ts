export interface DatepickerOptionsInterface {
    icon?: string,
    startDate?: Date,
    endDate?: Date,
    autoclose?: boolean,
    todayBtn?: boolean | 'linked',
    todayHighlight?: boolean,
    assumeNearbyYear?: boolean,
    placeholder?: string;
    format?: string;
}