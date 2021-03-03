import Vue from 'vue'


/** 日期格式化 */
Vue.prototype.rTime = function (date, long = true) {
    var json_date = new Date(date).toJSON();
    const newDate = new Date(new Date(json_date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    if (long) {
        return newDate
    } else {
        return newDate.split(' ')[0]
    }
}