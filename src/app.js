import Menu from "./routes/Menu.js";
import Cart from "./routes/Cart.js";
import Pay from "./routes/Pay.js";
import Order from "./routes/Order.js";

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