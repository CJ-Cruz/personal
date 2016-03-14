var timers = {};
var times = {};

function check(id){

	if(timers[id] != null){
		clearInterval(timers[id]);
		timers[id] = null;
		times[id] = null;
	}

}

function stopwatch(id){

	check(id);
	start(id);

	times[id] = Date.now();
	timers[id] = setInterval(function(){update(id, 1, times[id]);}, 10);
	
}

function countdown(id, hr, min, sec){

	check(id);	
	start(id);

	var now = Date.now();

	times[id] = now + (hr*3600000) + (min*60000) + (sec*1000);
	if(isNaN(times[id]))
		times[id]=now;

	timers[id] = setInterval(function(){update(id, 0, times[id]);}, 10);
	
}

function digitize(num){
	if(num <= 9)
		num = '0' + num;

	return num;
}

function update(id, type, end){

	if(type == 0)
		var value = times[id] - Date.now();
	else if(type == 1)
		var value = Date.now() - times[id];

	if(value <= 0){

		document.getElementById(id).innerText = "00:00:00:00";
		complete(id)
		return;

	}

	var millis = value;
	var sec = millis/1000;
		millis = millis%100;
	var min = sec/60;
		sec = sec%60;
	var hr = min/60;
		min = min%60;

	value = digitize(Math.floor(hr)) + ':' + digitize(Math.floor(min)) + ':' + digitize(Math.floor(sec)) + ':' + digitize(Math.floor(millis));

	document.getElementById(id).innerText = value;

}
