export default class Cart extends HTMLElement {
    connectedCallback() {
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
            <ion-item>
                <ion-grid fixed="true" class="cart-item-grid">
                    <ion-row>
                      <ion-col size="3" class="cart-item-img-box">
                        <img alt="Silhouette of mountains" src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg" class="item-cart-img" />
                      </ion-col>
                      <ion-col size="8" >
                        
                        Coffee

                        <ul class="cart-item-addopt-list">
                          <li>milk</li>
                          <li>milk</li>
                        </ul>
                        
                        <div class="fs-5">3000 T</div>
                      </ion-col>
                      <ion-col size="4" class="cart-item-img-box">
                      <div class="counter">
                          <button class="btn-decrement disabled">
                              <ion-icon name="remove-outline"></ion-icon>
                          </button>

                          <input type="text" class="cart-counter-value" value="1" readonly>
                          <button class="btn-increment" >
                              <ion-icon name="add-outline"></ion-icon>
                          </button>
                      </div>
                      </ion-col>
                    </ion-row>
                </ion-grid>  
            </ion-item>
            <ion-item class="cart-service-fee">
              <ion-grid fixed="true">
                <ion-row>
                  <ion-col size="6">
                    Service fee
                  </ion-col>
                  <ion-col size="6" style="text-align: right;">
                    3000 T
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
        </ion-list>

        <ion-grid class="anything-else-block">
          <h2 class="category-name">Anything else?</h2>
          <ion-row>
            <ion-col size="4">
              <ion-card class="item-card-cart" mode="ios">
                  <img alt="Silhouette of mountains" src="https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg" class="item-img-cart"/>
                  <ion-card-header class="py-2 px-2">
                    <ion-card-title class="item-name">Cappuccino</ion-card-title>
                    <ion-card-subtitle  class="item-price">3000₸</ion-card-subtitle>
                  </ion-card-header>
                
                  <ion-card-content class="pb-0 px-2 small">
                      250 ml (300kcal)
                  </ion-card-content>
  
                  <div class="item-add">
                      <ion-button size="small" class="item-add-btn">
                          <ion-icon name="add-outline"></ion-icon>
                          Add
                      </ion-button>
                  </div>
                </ion-card>
            </ion-col>
            <ion-col size="4">
              <ion-card class="item-card-cart" mode="ios">
                  <img alt="Silhouette of mountains" src="https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg" class="item-img-cart" />
                  <ion-card-header class="py-2 px-2">
                    <ion-card-title class="item-name">Cappuccino</ion-card-title>
                    <ion-card-subtitle class="item-price">3000₸</ion-card-subtitle>
                  </ion-card-header>
                
                  <ion-card-content class="pb-0 px-2 small">
                    250 g (300kcal)
                  </ion-card-content>
  
                  <div class="item-add">
                      <ion-button size="small" class="item-add-btn">
                          <ion-icon name="add-outline"></ion-icon>
                          Add
                      </ion-button>
                  </div>
                </ion-card>
            </ion-col>
            <ion-col size="4">
              <ion-card class="item-card-cart" mode="ios">
                  <img alt="Silhouette of mountains" src="https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg" class="item-img-cart" />
                  <ion-card-header class="py-2 px-2">
                    <ion-card-title class="item-name">Cappuccino</ion-card-title>
                    <ion-card-subtitle class="item-price">3000₸</ion-card-subtitle>
                  </ion-card-header>
                
                  <ion-card-content class="pb-0 px-2 small">
                    250 g (300kcal)
                  </ion-card-content>
  
                  <div class="item-add">
                      <ion-button size="small" class="item-add-btn">
                          <ion-icon name="add-outline"></ion-icon>
                          Add
                      </ion-button>
                  </div>
                </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
        
        

    </ion-content>
    <ion-footer>
    <div class="next-div-container">
          <ion-router-link href="${this.restaurant_Id}/pay">
              <button class="next-btn">
                  <ion-grid>
                      <ion-row>
                          <ion-col size="4" class="next-btn-count">7 items</ion-col>
                          <ion-col size="4">Next</ion-col>
                          <ion-col size="4" class="next-btn-price">3000 ₸</ion-col>
                      </ion-row>
                  </ion-grid>
              </button>
          </ion-router-link>
      </div></ion-footer>
        `;
       
    }
}

customElements.define('nav-cart', Cart)