exports.get_full_date = function(date) {
    var year  = ("0" + (date.getFullYear())).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day   = ("0" + (date.getDate())).slice(-2);
    var hour  = ("0" + (date.getHours())).slice(-2);
    var min   = ("0" + (date.getMinutes())).slice(-2);
    var sec   = ("0" + (date.getSeconds())).slice(-2);
    var full_date = year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec;
    return full_date;
}

exports.get_readable_format_size = function(bytes) {
    var sufix = ["B", "KB", "MB", "GB"];
    var format = "";
    var base_size = 1024;
    var size = bytes / base_size;
    for (var i = 0; i < sufix.length; i++) {
        if (size <= base_size) {
            size = Math.round (size);
            size = Number(size).toFixed(1);
            format = `${size} ${sufix[i]}`;
            break;
        } else {
            size = size / base_size;
        }
    }
    return format;
}

exports.bubbleSort = function(myArr) {
    const l = myArr.length;
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l - 1 - i; j++ ) {
            if ( myArr[j].price > myArr[j + 1].price ) {
                [ myArr[j], myArr[j + 1] ] = [ myArr[j + 1], myArr[j] ];
            }
        }
    }  
    return myArr;
};
