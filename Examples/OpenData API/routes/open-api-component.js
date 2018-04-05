(()=>{
	window.customElements.define('open-api-component', class extends HTMLElement {
		static get observedAttributes(){return ['location']}
		constructor(){
			super()
			//you will not be able to user JQuery if you use shadow root but its better
			//to encapsulate styles so they dont leak out
			this.shadow = this.attachShadow({mode:'open'})
			this.shadow.innerHTML = `
				<style>
					@import url(https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css);
					:host{
						display:block;	
						
                    }
                    .open-api-measurement {
                        font-size: 0.88rem;
                    }
				</style>
				<div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="open-api-measurement"><strong><span>Wind speed: </span></strong><span id="wind-speed"> - </span></div>
                            <div class="open-api-measurement"><strong><span>Wind direction: </span></strong><span id="wind-direction"> - </span></div>
                            <div class="open-api-measurement"><strong><span>Sunshine time: </span></strong><span id="sunshine-time"> - </span></div>
                            <div class="open-api-measurement"><strong><span>Weather: </span></strong><span id="weather"> - </span></div>
                            <div class="open-api-measurement"><strong><span>Humidity: </span></strong><span id="humidity"> - </span></div>
                            <div class="open-api-measurement"><strong><span>Air temperature: </span></strong><span id="air-temperature"> - </span></div>
                        </div>
                    </div>
				</div>
			`
		}

		$(selector){
			return this.shadow.querySelector(selector)
		}
		attributeChangedCallback(name,old,value){
			//an attribute defined in observedAttributes static has changed
            console.log({name,old,value})
			switch(name){
				case name:
					if(value) this.update(value)
					break
			}
		}


		connectedCallback(){
			//element is connected and ready to be used
		}

		async update(location){
            const windSpeed = await fetch('http://localhost:3000/api/wind-speed')
            const windDirection = await fetch('http://localhost:3000/api/wind-direction')
            const sunshineTime = await fetch('http://localhost:3000/api/sunshine-time')
            const currentWeather = await fetch('http://localhost:3000/api/weather')
            const humidityLevel = await fetch('http://localhost:3000/api/humidity')
            const airTemperature = await fetch('http://localhost:3000/api/air-temperature')
			// const text = await windSpeed.text()
            this.$('#wind-speed').innerHTML = await windSpeed.text()
            this.$('#wind-direction').innerHTML = await windDirection.text()
            this.$('#sunshine-time').innerHTML = await sunshineTime.text()
            this.$('#weather').innerHTML = await currentWeather.text()
            this.$('#humidity').innerHTML = await humidityLevel.text()
            this.$('#air-temperature').innerHTML = await airTemperature.text()
		}

	})
})()