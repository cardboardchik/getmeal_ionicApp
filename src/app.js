import Menu from "./routes/Menu.js";
import Cart from "./routes/Cart.js";
import Pay from "./routes/Pay.js";

class AppRoot extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <ion-app>
          <ion-router>
            <ion-route url="/" component="nav-menu"></ion-route>
            <ion-route url="/cart" component="nav-cart"></ion-route>
            <ion-route url="/pay" component="nav-pay"></ion-route>
          </ion-router>
          <ion-nav><ion-nav>
        </ion-app>`;
    }
  }
  
  export {Menu, Cart, Pay};

  customElements.define("app-root", AppRoot);