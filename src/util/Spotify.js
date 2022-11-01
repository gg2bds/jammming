const clientId = '4ad1cd926830413a8134b1692aa00b1d';
const redirectUri = 'http://localhost:3000'
let accessToken;

//new add for retrive playlist
let userId;


const Spotify ={
	getAccessToken(){
		if(accessToken){
			return accessToken;
		}
		
		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
		
		if(accessTokenMatch && expiresInMatch){
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);
			window.setTimeout(() => accessToken ='', expiresIn *1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		}else{
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
			window.location = accessUrl;
		}
	},
	
	search(term){
		const accessToken = Spotify.getAccessToken();
			return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{ headers:{
				Authorization: `Bearer ${accessToken}`
			}
		}).then(response =>{
			return response.json();
		}).then(jsonResponse =>{
			if(!jsonResponse.tracks){
				return[];
			}
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}));
		});
	},
	
	savePlaylist(name, trackUris){
		if(!name || !trackUris.length){
			return;
		}
		
		const accessToken = Spotify.getAccessToken();
		const headers= {Authorization: `Bearer ${accessToken}`};
		const currentUser = Spotify.getCurrentUserId();
				
		return fetch('https://api.spotify.com/v1/me',{headers: headers}
		).then(response => response.json()
		).then(jsonResponse =>{
			//userId = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/${currentUser}/playlists`,
				{
					headers:headers,
					method: 'POST',
					body: JSON.stringify({name:name})
				}).then(response => response.json()
				).then(jsonResponse =>{
					const playlistId = jsonResponse.id;
					return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
						headers:headers,
						method: 'POST',
						body: JSON.stringify({uris: trackUris})
					})
				});
		});
	},
/*
//new add for retrive playlist
	getUserPlaylist(){
		
		const accessToken = Spotify.getAccessToken();
		const headers= {Authorization: `Bearer ${accessToken}`};
		const currentUser = Spotify.getCurrentUserId();
		
		
		return fetch(`https://api.spotify.com/v1/users/${currentUser}/playlist`, 
			{headers: headers}).then(response => response.json()
			).then(jsonResponse =>{
				const playlistId = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
					headers:headers,
					method:'GET',
					body: JSON.stringify({uris: trackUris})
				})
			});
	}
}
*/


//new method for retrive current userId 
	getCurrentUserId(){
		if(userId) return userId;
		
		const accessToken = Spotify.getAccessToken();
		const headers= {Authorization: `Bearer ${accessToken}`};
		const url = 'https://api.spotify.com/v1/me';
		
		return fetch(url, {headers: headers}
		).then(response => response.json()
		).then(jsonResponse =>{userId = jsonResponse.id;
			return userId;
		})
		
	}

}

export default Spotify;