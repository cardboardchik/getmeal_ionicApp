export default class Cart extends HTMLElement {
  connectedCallback() {
      this.render();
  }

  render() {
      const cart = JSON.parse(localStorage.getItem('cart')) || { items: {} };

      let cartItemsHtml = '';
      let totalPrice = 0;

      Object.values(cart.items).forEach(item => {
          const itemTotal = item.quantity * item.price;
          totalPrice += itemTotal;

          cartItemsHtml += `
          <ion-item>
              <ion-grid fixed="true" class="cart-item-grid">
                  <ion-row>
                      <ion-col size="3" class="cart-item-img-box">
                          <img alt="${item.name}" src="${item.image ? item.image : "./media/sample/71908.png" }" class="item-cart-img" />
                      </ion-col>
                      <ion-col size="8">
                          ${item.name}
                          <ul class="cart-item-addopt-list">

                          </ul>
                          <div class="fs-5">${item.price} ₸</div>
                      </ion-col>
                      <ion-col size="4" class="cart-item-img-box">
                          <div class="counter">
                              <button class="btn-decrement" data-item-id="${item.id}">
                                  <ion-icon name="remove-outline"></ion-icon>
                              </button>
                              <input type="text" class="cart-counter-value" value="${item.quantity}" readonly>
                              <button class="btn-increment" data-item-id="${item.id}">
                                  <ion-icon name="add-outline"></ion-icon>
                              </button>
                          </div>
                      </ion-col>
                  </ion-row>
              </ion-grid>  
          </ion-item>
          `;
      });

      // Список дополнительных товаров
      const additionalItems = [
          {
              id: '99',
              name: 'Cappuccino',
              price: 1000,
              image: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg',
              options: ['250 ml (300kcal)']
          },
          // Добавьте больше товаров, если нужно
      ];

      let additionalItemsHtml = '';
      additionalItems.forEach(item => {
          additionalItemsHtml += `
          <ion-col size="4">
            <ion-card class="item-card-cart" mode="ios">
                <img alt="${item.name}" src="${item.image ? item.image : "./media/sample/71908.png" }" class="item-img-cart"/>
                <ion-card-header class="py-2 px-2">
                  <ion-card-title class="item-name">${item.name}</ion-card-title>
                  <ion-card-subtitle class="item-price">${item.price} ₸</ion-card-subtitle>
                </ion-card-header>
              
                <ion-card-content class="pb-0 px-2 small">
                    ${item.options[0]}
                </ion-card-content>

                <div class="item-add">
                    <ion-button size="small" class="item-add-btn" data-item-id="${item.id}">
                        <ion-icon name="add-outline"></ion-icon>
                        Add
                    </ion-button>
                </div>
            </ion-card>
          </ion-col>
          `;
      });

      this.innerHTML = `
      <ion-header>
          <ion-toolbar class="cart-toolbar">
              <ion-buttons slot="start">
                  <ion-back-button default-href="/${this.restaurant_Id}" icon="arrow-back-outline" text=""></ion-back-button>
              </ion-buttons>
              <ion-title>Your Order</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content class="cart-page">
          <ion-list class="cart-list">
              ${cartItemsHtml}
              <ion-item class="cart-service-fee">
                  <ion-grid fixed="true">
                      <ion-row>
                          <ion-col size="6">Service fee</ion-col>
                          <ion-col size="6" style="text-align: right;">0 T</ion-col>
                      </ion-row>
                  </ion-grid>
              </ion-item>
          </ion-list>
          <ion-grid class="anything-else-block">
              <h2 class="category-name">Anything else?</h2>
              <ion-row>
                  ${additionalItemsHtml}
              </ion-row>
          </ion-grid>
      </ion-content>
      <ion-footer>
          <div class="next-div-container">
              <ion-router-link href="${this.restaurant_Id}/pay">
                  <button class="next-btn">
                      <ion-grid>
                          <ion-row>
                              <ion-col size="4" class="next-btn-count">${Object.keys(cart.items).length} items</ion-col>
                              <ion-col size="4">Next</ion-col>
                              <ion-col size="4" class="next-btn-price">${totalPrice} ₸</ion-col>
                          </ion-row>
                      </ion-grid>
                  </button>
              </ion-router-link>
          </div>
      </ion-footer>
      `;

      this.attachEventHandlers(cart, additionalItems);
  }

  attachEventHandlers(cart, additionalItems) {
      // Обработка кнопок для увеличения/уменьшения количества товаров
      this.querySelectorAll('.btn-increment').forEach(button => {
          button.addEventListener('click', () => {
              const itemId = button.getAttribute('data-item-id');
              this.updateItemQuantity(cart, itemId, 1);
          });
      });

      this.querySelectorAll('.btn-decrement').forEach(button => {
          button.addEventListener('click', () => {
              const itemId = button.getAttribute('data-item-id');
              this.updateItemQuantity(cart, itemId, -1);
          });
      });

      // Обработка добавления новых товаров из раздела "Anything else?"
      this.querySelectorAll('.item-add-btn').forEach(button => {
          button.addEventListener('click', () => {
              const itemId = button.getAttribute('data-item-id');
              const selectedItem = additionalItems.find(item => item.id === itemId);
              this.addItemToCart(cart, selectedItem);
          });
      });
  }

  updateItemQuantity(cart, itemId, delta) {
      const item = cart.items[`id-${itemId}`];
      if (item) {
          item.quantity += delta;
          if (item.quantity <= 0) {
              delete cart.items[`id-${itemId}`];
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          this.render();
      }
  }

  addItemToCart(cart, item) {
      if (cart.items[`id-${item.id}`]) {
          cart.items[`id-${item.id}`].quantity += 1;
      } else {
          cart.items[`id-${item.id}`] = {
              ...item,
              quantity: 1
          };
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      
      this.render();
  }
}

customElements.define('nav-cart', Cart);
