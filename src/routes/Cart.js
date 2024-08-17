export default class Cart extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <ion-header>
            <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button default-href="/"></ion-back-button>
            </ion-buttons>
            <ion-title>Page Two</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <h1>Page Two</h1>
            <div>
            <ion-nav-link router-direction="forward" component="page-three">
                <ion-button>Go to Page Three</ion-button>
            </ion-nav-link>
            </div>
        </ion-content>
        `;
       
    }
}

customElements.define('nav-cart', Cart)