const messages ={
	horoscope: ['Aries', 'Taurus', 'Gemini', 'Cacer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
	luck: ['Great','Very Good','Good','ok','bad','terrible','what a mess'],
	raisingLuck: ['Go with Friends', 'Relax', 'Stay Alone', 'EAT!', 'Listening to music you like', 'Do the thing you want']
}

function randMessage(){
	return Math.floor(Math.random()*messages.length);
}

console.log(messages);