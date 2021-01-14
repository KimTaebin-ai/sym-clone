import * as moment from 'moment';

export class DateUtil {

    // return today (default: yyyy-MM-dd HH:mm:ss)
    public static getToday(format?) {
        return DateUtil.convertFormat(new Date(), format);
    }

    // return today (yyyy-mm-dd)
    public static getTodayYYYYMMDD() {
        return DateUtil.convertFormat(new Date(), 'YYYY-MM-DD');
    }

    // return today starting (default: yyyy-MM-dd HH:mm:ss)
    public static getTodayStart(format?) {
        if (format == null){
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        return moment(new Date()).startOf('day').format(format);
    }

    // return today end string (default: yyyy-MM-dd HH:mm:ss)
    public static getTodayEnd(format?) {
        if (format == null){
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        return moment(new Date()).endOf('day').format(format);
    }

    // return today start milliseconds
    public static getTodayMsStart() {
        return moment(new Date()).startOf('day').valueOf();
    }


    // return today end milliseconds
    public static getTodayMsEnd() {
        return moment(new Date()).endOf('day').valueOf();
    }

    // return convert format date
    public static convertFormat(date, format?){
        // console.log(moment(date).format()); // YYYY-MM-DDTHH:mm:ssZ (2018-08-10T00:00:00+09:00)
        // console.log(moment(date).format("YYYY-MM-DDTHH:mm:ss")); // 2018-08-10T00:00:00
        // console.log(moment(date).format("YYYY-MM-DD")); // 2018-08-10
        // console.log(moment(date).format("YYYY-MM-DD HH:mm:ss")); 2018-08-10 00:00:00
        if(format == null){
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        return moment(date).format(format);
    }

    // return compare true/false
    public static compareAfter(date, afterDate){
        return moment(date).isAfter(afterDate);
    }
    public static compareSameOrAfter(date, compareDate) {
        return moment(date).isSameOrAfter(compareDate);
    }
    public static compareBefore(date, beforeDate){
        return moment(date).isBefore(beforeDate);
    }
    public static compareSameOrBefore(date, compareDate) {
        return moment(date).isSameOrBefore(compareDate);
    }

    // return date add sconds
    public static addSeconds(date, seconds, format?){
        if (format == null){
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        return moment(date).add(seconds, 'seconds').format(format);
    }
    public static addMinutes(date, minutes, format?) {
        if (format == null){
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        return moment(date).add(minutes, 'minutes').format(format);
    }
    public static addDays(date, days, format?){
        if (format == null){
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        return moment(date).add(days, 'days').format(format);
    }
    public static addMonths(date, months, format?) {
        if (format == null){
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        return moment(date).add(months, 'months').format(format);
    }
    public static addMonth(date, month, format?) {
        let convertDate:any = new Date(date);
        if (format == null){
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        convertDate = convertDate.setMonth(convertDate.getMonth() + month);
        return moment(convertDate).format(format);
    }

    public static addYear(date, year, format?) {
        let convertDate:any = new Date(date);
        if(format == null){
            format = "YYYY-MM-DD HH:mm:ss";
        }
        convertDate = convertDate.setFullYear(convertDate.getFullYear() + year);
        return moment(convertDate).format(format);
    }

    public static minusYear(date, year, format?) {
        let convertDate:any = new Date(date);
        if(format == null){
            format = "YYYY-MM-DD HH:mm:ss";
        }
        convertDate = convertDate.setFullYear(convertDate.getFullYear() - year);
        return moment(convertDate).format(format);
    }

    // return date minus days
    public static minusDays(date, days, format?) {
        if(format == null){
            format = "YYYY-MM-DD HH:mm:ss";
        }
        return moment(date).subtract(days, "days").format(format);
    }
    public static minusMonths(date, months, format?) {
        if(format == null){
            format = "YYYY-MM-DD HH:mm:ss";
        }
        return moment(date).subtract(months, "months").format(format);
    }

    //
    public static diff(start, end){
        let startDate = DateUtil.convertFormat(start, "YYYY-MM-DD HH:mm:ss");
        let endDate = DateUtil.convertFormat(end, "YYYY-MM-DD  HH:mm:ss");
        return moment.duration(moment(endDate, "YYYY-MM-DD HH:mm:ss").diff(moment(startDate)));
    }

    //
    public static diffDay(start, end) {
        let startDate = DateUtil.convertFormat(start, "YYYY-MM-DD");
        let endDate = DateUtil.convertFormat(end, "YYYY-MM-DD");
        return moment(endDate, 'YYYY-MM-DD').diff(moment(startDate), "days");
    }

    public static startOf(date, type,format?) {
        var convertDate = moment(new Date(date)).startOf(type).toDate();
        return DateUtil.convertFormat(convertDate, format);
    }

    public static endOf(date, type, format?) {
        var convertDate = moment(new Date(date)).endOf(type).toDate();
        return DateUtil.convertFormat(convertDate, format);
    }

}
