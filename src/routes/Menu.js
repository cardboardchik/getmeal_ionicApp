export default class Menu extends HTMLElement {
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
    <ion-content>
    <div class="restaurant-head">
        <img src="/media/sample/Bitmap.png" alt="img" class="img-full">
        <ion-avatar>
            <img alt="img" src="/media/sample/s_logo.svg" />
        </ion-avatar>
    </div>
    <div class="restaurant-info">
        <h1 class="restaurant-name">Starbucks Dostyk</h1>
        <h5 class="text-secondary">Сoffee Shop</h5>
        
        <ion-grid class="mt-3 p-0">
            <ion-row>
              <ion-col size="auto" class="px-0"><ion-icon name="time" class="align-baseline"></ion-icon></ion-col>
              <ion-col class="align-middle px-2"><h6 class="work-time">9:00 - 18:00</h6></ion-col>

            </ion-row>
          </ion-grid>
    </div>
    <div class="nav-menu" mode="ios">
        <ion-segment scrollable="true" value="default" class="categories">
            <ion-segment-button value="default">
                <ion-label>Default Menu</ion-label>
            </ion-segment-button>
            <ion-segment-button value="vegan">
                <ion-label>Vegan Menu</ion-label>
            </ion-segment-button>
        </ion-segment>
        <ion-segment scrollable="true" value="coffee" class="categories">
            <ion-segment-button value="coffee">
                <ion-label>Coffee</ion-label>
            </ion-segment-button>
            <ion-segment-button value="snacks">
                <ion-label>Snacks</ion-label>
            </ion-segment-button>
            <ion-segment-button value="sheik">
                <ion-label>Шейки</ion-label>
            </ion-segment-button>
            <ion-segment-button value="tea">
                <ion-label>Tea</ion-label>
            </ion-segment-button>
            <ion-segment-button value="выпечка">
                <ion-label>Выпечка</ion-label>
            </ion-segment-button>
            <ion-segment-button value="string">
                <ion-label>Tea</ion-label>
            </ion-segment-button>
            <ion-segment-button value="string">
                <ion-label>Tea</ion-label>
            </ion-segment-button>
            <ion-segment-button value="string">
                <ion-label>Tea</ion-label>
            </ion-segment-button>
            <ion-segment-button value="string">
                <ion-label>Tea</ion-label>
            </ion-segment-button>
            <ion-segment-button value="string">
                <ion-label>Tea</ion-label>
            </ion-segment-button>
        </ion-segment>
    </div>


    <ion-grid>
        <h2 class="category-name">Coffee</h2>
        <ion-row>
            <ion-col size="6">
                <ion-card class="item-card" mode="ios">
                    <img alt="Silhouette of mountains" src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg" class="item-img" />
                    <ion-card-header class="py-2 px-2">
                      <ion-card-title class="item-name">Cappuccino</ion-card-title>
                      <ion-card-subtitle class="item-price">3000₸</ion-card-subtitle>
                    </ion-card-header>
                  
                    <ion-card-content class="pb-0 px-2 small">
                      250 g (300kcal)
                    </ion-card-content>

                    <div class="item-add">
                        <ion-button id="open-modal1" expand="block1" size="small" class="item-add-btn">
                            <ion-icon name="add-outline"></ion-icon>
                            Add
                        </ion-button>
                    </div>

                    <ion-modal trigger="open-modal1">
                        <div class="block1 block">
                            <ion-content>
                                <img alt="Silhouette of mountains" src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg" />
                                <div class="description-block">
                                    Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG. Completely open source, MIT licensed and built by Ionic.

                                    <p class="text-secondary fw-bold small pt-2 mb-1">Ingredients</p>
                                    Water, Coffee, Milk
                                </div>

                                <div class="item-add-block">
                                    <ion-grid>
                                        <ion-row>
                                          <ion-col size="auto" class="align-content-end">Coffee</ion-col>
                                          <ion-col size="auto" class="text-secondary align-content-end">500ml</ion-col>
                                          <ion-col class="text-end align-content-end">3000 ₸</ion-col>
                                        </ion-row>
                                    
                                        <ion-row class="add-group-btns">
                                          <ion-col size="5">
                                            <div class="counter">
                                                <button class="btn-decrement disabled">
                                                    <ion-icon name="remove-outline"></ion-icon>
                                                </button>

                                                <input type="text" class="counter-value" value="1" readonly>
                                                <button class="btn-increment" >
                                                    <ion-icon name="add-outline"></ion-icon>
                                                </button>
                                            </div>
                                          </ion-col>
                                          <ion-col size="7">
                                            <button class="add-to-cart-btn">
                                                Add
                                            </button>
                                          </ion-col>
                                        </ion-row>
                                    </ion-grid>
                                </div>
                            </ion-content>
                        </div>
                    </ion-modal>

                  </ion-card>
              </ion-col>
          <ion-col size="6">
            <ion-card class="item-card" mode="ios">
                <img alt="Silhouette of mountains" src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg" class="item-img" />
                <ion-card-header class="py-2 px-2">
                  <ion-card-title class="item-name">Cappuccino</ion-card-title>
                  <ion-card-subtitle class="item-price">3000₸</ion-card-subtitle>
                </ion-card-header>
              
                <ion-card-content class="pb-0 px-2 small">
                  250 g (300kcal)
                </ion-card-content>

                <div class="item-add">
                    <ion-button id="open-modal" expand="block" size="small" class="item-add-btn">
                        <ion-icon name="add-outline"></ion-icon>
                        Add
                    </ion-button>
                </div>
              </ion-card>
          </ion-col>
        </ion-row>
    </ion-grid>

    <ion-grid>
        <h2 class="category-name">Snacks</h2>
        <ion-row>
          <ion-col size="6">
            <ion-card class="item-card" mode="ios">
                <img alt="Silhouette of mountains" src="https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg" class="item-img"/>
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
          <ion-col size="6">
            <ion-card class="item-card" mode="ios">
                <img alt="Silhouette of mountains" src="https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg" class="item-img" />
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

    <div class="next-div-container">
        <ion-router-link href="/cart">
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
    </div>

    
    </ion-content>
    `;
    
    }
}

customElements.define('nav-menu', Menu)