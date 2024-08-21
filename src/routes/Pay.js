import API_URL from "./api.js";

export default class Pay extends HTMLElement {
    connectedCallback() {
        this.render();

        

    }
    
    render() {

      const cart = JSON.parse(localStorage.getItem('cart')) || { items: {} };

      let totalPrice = 0;

      Object.values(cart.items).forEach(item => {
          const itemTotal = item.quantity * item.price;
          totalPrice += itemTotal;
      });

      const table_num = localStorage.getItem("table")

      if (table_num != "null") {
        var settings = {
            "url": `${API_URL}/api/order/create/`,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "accept": "application/json",
              "Content-Type": "application/json",
            },
            "data": JSON.stringify({
              "table": parseInt(localStorage.getItem("table")),
              "items": cart,
              "paid_at": null,
              "is_paid": false,
              "total_price": totalPrice,
              "organization": parseInt(localStorage.getItem("organization_id")),
              "restaurant": this.restaurant_Id,
              "cart": null,
              "status": null
            }),
          };
        $(document).on('click', '#pay_btn', function() {
          $.ajax(settings).done(function (response) {
            console.log(response);
            localStorage.setItem("cart", '{"items": {}}')
          });

        })
        
    
        this.innerHTML = `
        <ion-header>
            <ion-toolbar class="cart-toolbar">
            <ion-buttons slot="start">
              <ion-back-button default-href="/${this.restaurant_Id}/cart" icon="arrow-back-outline" text=""></ion-back-button>
            </ion-buttons>
            <ion-title>
                Payment
                <div class="small fw-light">Table №1</div>
            </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-radio-group value="space-between">
                <h1 style="padding:15px 0 0 15px;">Payment Method</h1>
                <ion-item>
                  <ion-radio value="space-between" justify="space-between" class="pay-method-radio">
                    <div class="pay-method-radio">
                        <ion-icon name="card" style="width: 36px; height:36px;"></ion-icon>
                        <span style="padding-left: 8px;">Card</span>
                    </div>
                  </ion-radio>
                </ion-item>
                <ion-item>
                  <ion-radio value="space-between1" justify="space-between" class="pay-method-radio">
                    <img src="media/sample/KKS.F_BIG.svg" alt="Kaspi" style="width: 150px;">
                  </ion-radio>
                </ion-item>
                <ion-item style="--inner-border-width: 0;">
                    <ion-radio value="space-between2" justify="space-between" class="pay-method-radio">
                      <div class="pay-method-radio">
                            <ion-icon name="receipt" style="width: 36px; height:36px;"></ion-icon>
                          <span style="padding-left: 8px;">Pay Later</span>
                      </div>
                    </ion-radio>
                </ion-item>
            </ion-radio-group>
            
        
    
        </ion-content>
        <ion-footer>
        <div class="next-div-container" style="padding:0px">
                <ion-grid style="padding:0px">
                    <ion-row>
                      <ion-col size="5">
                        <div>
                            <span class="fs-1">${totalPrice} ₸</span>
                            <div class="small" style="margin-top: -10px;">Total</div>
                        </div>
                      </ion-col>
                      <ion-col size="7">
                        <ion-router-link href="/${this.restaurant_Id}/order">
                            <button class="add-to-cart-btn fw-bold" id="pay_btn">
                                Order
                            </button>
                        </ion-router-link>
                      </ion-col>
                    </ion-row>
                </ion-grid>
        </div></ion-footer>
        `;
      }

      
    
    }
}

customElements.define('nav-pay', Pay)