[h: minuteEvents = json.get(macro.args,"minuteEvents")]
[h: minute = json.get(macro.args,"minute")]
[h: secondVar = json.sort(json.fields(minuteEvents,"json"))]
[FOREACH(second, secondVar,""), code:{
		[h: secondEvents = json.get(minuteEvents, strformat("%02d",second))]
		[h: testVar="[]"]
		[FOREACH(event, secondEvents,""), code:{
			[h: testVar = json.append(testVar,json.get(event,"gmOnly"))] 
		}]
		[h: 'broadcast(minute +":"+second +" - "+testVar)']
	<tr><td>[r: if(json.length(testVar)>0 && (json.contains(testvar,"false") || isGM()),strformat("%02d",minute)+":"+strformat("%02d",second),"")]</td><td>
		[FOREACH(event, secondEvents,"<br/>"), code:{
			[h: eventArgs=json.remove(macro.args,"hourEvents")]
			[h: eventArgs=json.remove(eventArgs,"minuteEvents")]
			[h: eventArgs=json.set(eventArgs,"second",strformat("%02d",second),"index",roll.count)]
			[r: if((isGM()==1 && json.get(event,"gmOnly")=="true") || (json.get(event,"gmOnly")!="true"),macroLink(json.get(event,"name"),"viewEvent@Lib:DateTime", "none", eventArgs),"")]
		}]
	</td></tr>
}]