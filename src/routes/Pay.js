export default class Pay extends HTMLElement {
    connectedCallback() {
        this.render();

        
        var modal = document.querySelectorAll('ion-modal');

        modal.forEach(modal => {
            modal.initialBreakpoint = 1;
            modal.breakpoints = [0, 1];
        })


        $(document).ready(function() {
            $('.btn-increment').on('click', function() {
                var $counterValue = $(this).siblings('.counter-value');
                var currentValue = parseInt($counterValue.val());
                $counterValue.val(currentValue + 1);
                $('.btn-decrement').removeClass("disabled")
            });

            $('.btn-decrement').on('click', function() {
                var $counterValue = $(this).siblings('.counter-value');
                var currentValue = parseInt($counterValue.val());
                
                if (currentValue > 1) {  // чтобы значение не уходило в ноль
                    $counterValue.val(currentValue - 1);
                }
                if (currentValue - 1 < 2) {
                    $(this).addClass("disabled")
                }  
            });
        });


    }
    
    render() {
    this.innerHTML = `
     <ion-header>
        <ion-toolbar class="cart-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/" icon="arrow-back-outline" text=""></ion-back-button>
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
                        <span class="fs-1">3000 T</span>
                        <div class="small" style="margin-top: -10px;">Total</div>
                    </div>
                  </ion-col>
                  <ion-col size="7">
                    <ion-router-link href="/">
                        <button class="add-to-cart-btn fw-bold" >
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

customElements.define('nav-pay', Pay)