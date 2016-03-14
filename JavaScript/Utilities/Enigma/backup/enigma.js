
// powered by [ DavidBau | seedrandom ] ----------
// https://github.com/davidbau/seedrandom
!function(a,b){function c(c,j,k){var n=[];j=1==j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null==c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;q>a;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/(4*(1<<30))},u["double"]=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this==b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);l>e;)g[e]=e++;for(e=0;l>e;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(f(a[c],b-1))}catch(g){}return d.length?d:"string"==e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{if(j)return i(j.randomBytes(l));var b=new Uint8Array(l);return(k.crypto||k.msCrypto).getRandomValues(b),i(b)}catch(c){var d=k.navigator,e=d&&d.plugins;return[+new Date,k,e,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"==typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(t){}}else"function"==typeof define&&define.amd&&define(function(){return c})}([],Math);
//------------------------------------------------

//slist can be rearranged as your own unique key
var olist = "\t\n 1234567890-=!@#$%^&*()_+qwertyuiop[]QWERTYUIOP{}asdfghjkl;'ASDFGHJKL:\"zxcvbnm,./ZXCVBNM<>?|`~\\";
var slist;
var list
function enigma_init(c){	//c is the seed/key for your personal enigma

	slist = olist;
	resetChar();
	slist = scrambleChar(c);

}

function encrypt(Origmessage){
		
	var output="";
	
	try{
		
		resetChar();
		
		var key = getRandKey();
		
		scrambleChar(key);

		var m = Origmessage;
		message = ""+key;
		
		for(var i = 0; i < m.length; i++){
			
			var c = transpose(m[i], true, key.charCodeAt(0));

			if(c == "\\")
				message += "\\";
			else if(c == '"')
				message += "\"";
			else
				message += c;

			scrambleChar(c);
			
		}
		
	}
	catch(err){
		message = encrypt(Origmessage);
	}
	
	return message;
	
}
	
function decrypt(message){
	
	resetChar();

	var m = message;
	
	scrambleChar(m[0]);

	message = "";
	
	for(var i = 1; i < m.length; i++){
		
		var c = transpose(m[i], false, m.charCodeAt(0));
		
		message += c;
		
		scrambleChar(m[i]);

	}
	
	return message;
	
}

function resetChar(){
	
	list = slist;
	
}

function nextInt(limit){

	return Math.floor(Math.random()*limit);

}

function getRandKey(){
	
	Math.seedrandom();
	return String.fromCharCode(32 + nextInt(94));
	
}

function getIndex(c){

	for(var i = 0; i < list.length; i++){
		if(c == list[i])
			return i;
	}
	
	return -1;
	
}

function swap(index, index2){
	
	var temp = list[index].toString();
	list = list.replace(list[index],list[index2]);
	list = list.replace(list[index2], temp);
	
}

function scrambleChar(seed){
	
	for(var j = 0; j < seed.length; j++)

		Math.seedrandom(seed);

		for(var i = 0; i < list.length; i++){
			swap(nextInt(list.length), nextInt(list.length));
		}

	return list;
	
}

function transpose(c, encrypt, key){
		
	var index = getIndex(c);
	if(index === -1)
		return c;

	if(encrypt){

		index -= key;
		while(index < 0)
			index += list.length;

		return list[index];
	
	}
	else{

		index += key;
		while(index >= list.length)
			index -= list.length;
		
		return list[index];
		
	}
	
}
