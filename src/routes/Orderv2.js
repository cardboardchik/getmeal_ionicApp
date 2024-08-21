import API_URL from "./api.js";

export default class Order extends HTMLElement {
    connectedCallback() {
        this.render();

    }
    
    render() {
        localStorage.setItem("cart", '{"items": {}}')
        this.innerHTML = `
        <ion-header>
            <ion-toolbar class="cart-toolbar">
            
            <ion-title>
                Order #42
            </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>

            <h4 style="padding:15px 0 0 15px;" class="fw-bold">Your order has been accepted and is already being prepared</h4>
            <div style="padding:15px ;">
            <ion-progress-bar type="indeterminate" style="--progress-background: #E96E0E;"></ion-progress-bar>
            
            <ion-grid style="padding:0px; opacity:0.5;" class="fw-bold" >
                <ion-row>
                <ion-col size="8">
                    <div>
                        Average order waiting time
                    </div>
                </ion-col>
                <ion-col size="4" style="text-align: end;">
                    ~15 min
                </ion-col>
                </ion-row>
            </ion-grid>
            </div>    
            
            <div style="height: 80px; padding:15px;">
                <h5 class="fw-bold">Would you like to place another order?</h5>
                <ion-router-link href="/${this.restaurant_Id}?table=${localStorage.getItem("table")}" router-direction="root">
                    <button class="back-to-menu fw-bold" >
                        Back to Menu
                    </button>
                </ion-router-link>
            </div>

    </ion-content>
        `;      
    
    }
}

customElements.define('nav-order', Order)