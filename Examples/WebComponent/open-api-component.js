(()=>{
	window.customElements.define('open-api-component',class extends HTMLElement{
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
					<div class="jumbotron">
					  <h1 class="display-4">Hello, Open Api</h1>
					  <p class="lead">You can customize the style element above if needed & it will only affect styles in "shadow".</p>
					  <hr class="my-4">
					  <p>Anything in the ":host" refers to the css of the component kind of like the body would for the document.</p>
					  <p class="lead">
					    <h3>
					        <span id="wind-speed" class="badge badge-pill badge-primary">Loading wind speed....</span>
						</h3>
						
					  </p>
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
			const response = await fetch('http://cocopuff.org/open-api/wind-speed')
			const text = await response.text()
			this.$('#wind-speed').innerHTML = text
		}

	})
})()