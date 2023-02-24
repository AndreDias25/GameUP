const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '958c48c0femsh6c746b17896f64ap11ed84jsn0e0a967be395',
		'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
	}
};

fetch('https://opencritic-api.p.rapidapi.com/game/popular', options)
	.then(response => response.json())
	.then(data => {
        const list = data;
        list.map((item) => {
            const name = item.name;
            const teste = item.images.box.sm
            const poster = item.images.box.og
            const movie = `<img id="imgBanner" src="https://img.opencritic.com/${poster}">`
            //console.log(name);

            //document.querySelector('#imgMain').innerHTML = movie;
            document.querySelector('#imgMain').style = `background-image:url(https://img.opencritic.com/${poster})`
            //var img = document.querySelector('#imgMain');
            //img.setAttribute('src', poster)
        })
    })
	.catch(err => console.error(err))