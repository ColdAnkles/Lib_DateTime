"use strict";

function expire_calendar_cache(){
    let htmlCaches = JSON.parse(read_data("htmlCaches"));
    htmlCaches.allValid = false;
    htmlCaches.yearValid = false;
    htmlCaches.yearData = "";
    for (var m in htmlCaches){
        if (m.includes("month_")){
            htmlCaches[m].valid = false;
            htmlCaches[m].html = "";
        }
    }
    write_data("htmlCaches", JSON.stringify(htmlCaches));
}