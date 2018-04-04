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
				</style>
				<div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <h3>
                                <span id="wind-speed">...</span>
                            </h3>
                        </div>
                        <div class="col-md-6">
                            <h3>
                                <span id="wind-direction">...</span>
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h3>
                                <span id="sunshine-time">...</span>
                            </h3>
                        </div>
                        <div class="col-md-6">
                            <h3>
                                <span id="weather">...</span>
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h3>
                                <span id="humidity">...</span>
                            </h3>
                        </div>
                        <div class="col-md-6">
                            <h3>
                                <span id="air-temperature">...</span>
                            </h3>
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
				case 'location':
					if(value) this.update(value)
					break
			}
		}


		connectedCallback(){
			//element is connected and ready to be used
		}

		async update(location){
            const windSpeed = await fetch('http://cocopuff.org/open-api/wind-speed')
            const windDirection = await fetch('http://cocopuff.org/open-api/wind-direction')
            const sunshineTime = await fetch('http://cocopuff.org/open-api/sunshine-time')
            const currentWeather = await fetch('http://cocopuff.org/open-api/weather')
            const humidityLevel = await fetch('http://cocopuff.org/open-api/humidity')
            const airTemperature = await fetch('http://cocopuff.org/open-api/air-temperature')
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