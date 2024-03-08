[h: timeOne = json.get(macro.args,0)]
[h: timeTwo = json.get(macro.args,1)]

[h: addedTD = json.set("{}","year",json.get(timeOne,"year")+json.get(timeTwo,"year"),"month",json.get(timeOne,"month")+json.get(timeTwo,"month"),"day",json.get(timeOne,"day")+json.get(timeTwo,"day"),"hour",json.get(timeOne,"hour")+json.get(timeTwo,"hour"),"minute",json.get(timeOne,"minute")+json.get(timeTwo,"minute"),"second",json.get(timeOne,"second")+json.get(timeTwo,"second"))]

[h: macro.return = addedTD]