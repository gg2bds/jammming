const messages ={
	horoscope: ['Aries', 'Taurus', 'Gemini', 'Cacer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
	luck: ['Great','Very Good','Good','ok','bad','terrible','what a mess'],
	raisingLuck: ['Go with Friends', 'Relax', 'Stay Alone', 'EAT!', 'Listening to music you like', 'Do the thing you want']
}

function randMessage(num){
	return Math.floor(Math.random()*num);
}

let msgDialog = [];

for(let msg in messages){
	let index = randMessage(messages[msg].length);
	
	switch(msg){
		case 'horoscope':
			msgDialog.push(`${messages[msg][index]} is the lucky horoscope today.`);
			break;
		case 'luck':
			msgDialog.push(`Today your luck is ${messages[msg][index]}`);
			break;
		case 'raisingLuck':
			msgDialog.push(`${messages[msg][index]} can raise your luck today.`);
			break;
		default:
			msgDialog.push('Nothing'); break;
	}
}

console.log(msgDialog);

function fommatMsg(msg){
	const formatted = msgDialog.join('\n');
	console.log(formatted);
}

fommatMsg(msgDialog);