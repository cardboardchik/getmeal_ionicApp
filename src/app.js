import Menu from "./routes/Menu.js";
import Cart from "./routes/Cart.js";

class AppRoot extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <ion-app>
          <ion-router>
            <ion-route url="/" component="nav-menu"></ion-route>
            <ion-route url="/cart" component="nav-cart"></ion-route>
          </ion-router>
          <ion-nav><ion-nav>
        </ion-app>`;
    }
  }
  
  export {Menu, Cart};

  customElements.define("app-root", AppRoot);