window.addEventListener("load", () => {
	let long;
    let lat;
	let temperatureDescription = document.querySelector(
		".temperature-description"
	);
	let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature")
    let temperatureSpan = document.querySelector(".temperature span")
	if (navigator.geolocation) {
		//geolocation does not work with http in safari only https allows Location access
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/4bf57b16678e2a88ff67dd8d7a1e69dc/${lat},${long}`;
			fetch(api)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
                    const { temperature, summary,icon } = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // FORMULA
                    let celsius = (temperature - 32) * (5/9); 
                    // SETTING ICONS
                    setIcons(icon,document.querySelector(".icon"));
                    // change temperature to celsius/Fahrenheit
                    temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
                });
		});
	}
	// else{
	//     console.log("Enable Geolocation");
	//     h1.textContent = "Enable Geolocation"
    // }
    function setIcons(icon,iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon])
    }
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker
    //              .register('./sw.js');
    //   }
});