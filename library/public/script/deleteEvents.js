"use strict";

function deleteEvents() {
    let delEvents = read_data("deleteEvents");
    let eventData = JSON.parse(read_data("eventData"));
    if (delEvents == null || delEvents.length == 0 || delEvents == "\"\"") {
        delEvents = [];
    } else {
        delEvents = JSON.parse(delEvents);
        delEvents = delEvents.filter((value, index, array) => array.indexOf(value) === index);
    }    

    for (var u in delEvents) {
        let delYear = -1;
        let delMonth = -1;
        let delDay = -1;
        let delHour = -1;
        let delMin = -1;
        let delSec = -1;
        let delIndex = -1;
        let found = false;
        for (var y in eventData) {
            for (var M in eventData[y]) {
                for (var d in eventData[y][M]) {
                    for (var h in eventData[y][M][d]) {
                        for (var m in eventData[y][M][d][h]) {
                            for (var s in eventData[y][M][d][h][m]) {
                                for (var e in eventData[y][M][d][h][m][s]) {
                                    let eData = eventData[y][M][d][h][m][s][e];
                                    if (eData.uid == delEvents[u]) {
                                        delYear = y;
                                        delMonth = M;
                                        delDay = d;
                                        delHour = h;
                                        delMin = m;
                                        delSec = s;
                                        delIndex = e;
                                        found = true;
                                    }
                                    if (found) {
                                        break;
                                    }
                                }
                                if (found) {
                                    break;
                                }
                            }
                            if (found) {
                                break;
                            }
                        }
                        if (found) {
                            break;
                        }
                    }
                    if (found) {
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
            if (found) {
                break;
            }
        }
        if(found){
            eventData[delYear][delMonth][delDay][delHour][delMin][delSec].splice(delIndex, 1);
        }
    }
    write_data("eventData",JSON.stringify(eventData));
}

MTScript.registerMacro("datetime.deleteEvents", deleteEvents);