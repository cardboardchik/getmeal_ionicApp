import Menu from "./routes/Menuv2.js";
import Cart from "./routes/Cartv2.js";
import Pay from "./routes/Payv3.js";
import Order from "./routes/Orderv2.js";

class AppRoot extends HTMLElement {
    connectedCallback() {

      this.innerHTML = `
        <ion-app>
          <ion-router>
            <ion-route url="/:restaurant_Id" component="nav-menu"></ion-route>
            <ion-route url="/:restaurant_Id/cart" component="nav-cart"></ion-route>
            <ion-route url="/:restaurant_Id/pay" component="nav-pay"></ion-route>
            <ion-route url="/:restaurant_Id/order" component="nav-order"></ion-route>
          </ion-router>
          <ion-nav><ion-nav>
        </ion-app>`;
    }
  }
  
  export {Menu, Cart, Pay, Order};

  customElements.define("app-root", AppRoot);