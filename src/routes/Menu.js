import API_URL from "./api.js";

function modal_work() {
   

    $(document).on('click', '#categories-btns', function() {
        var categoryId = $(this).attr('cat');
        var targetId = `#cat-${categoryId}`;
        var targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView();
        }
    });
    

    $(document).off('click', '.btn-increment');
    $(document).off('click', '.btn-decrement');

    $(document).on('click', '.btn-increment', function() {
        var $counterValue = $(this).siblings('.counter-value');
        var currentValue = parseInt($counterValue.val());
        $counterValue.val(currentValue + 1);
        $(this).siblings('.btn-decrement').removeClass("disabled");
        $('.add-to-cart-btn').removeClass("delete-from-cart");
        $('.add-to-cart-btn').text("Add");
        let cart =  JSON.parse(localStorage.getItem('cart'));
        let item = cart.items[`id-${$(this).data('item-id')}`]
        if (item){
            $('.add-to-cart-btn').text("Update");

        }


    });

    $(document).on('click', '.btn-decrement', function() {
        var $counterValue = $(this).siblings('.counter-value');
        var currentValue = parseInt($counterValue.val());

        if (currentValue > 0) {
            $counterValue.val(currentValue - 1);
        }
        if (currentValue - 1 < 1) {
            $(this).addClass("disabled");
            $(`ion-col > button[data-item-id="${$(this).data('item-id')}"]`).addClass('delete-from-cart')
            $(`ion-col > button[data-item-id="${$(this).data('item-id')}"]`).text('Remove')
        }
    });//*[@id="ion-overlay-2"]/div/div/ion-content/div[2]/ion-grid/ion-row[2]/ion-col[2]/button

    $(document).on('click', '.add-to-cart-btn', function() {
        
        let item = {}
        item[`id-${$(this).data('item-id')}`] = {
            id: $(this).data('item-id'),
            name: $(this).data('item-name'),
            price: $(this).data('item-price'),
            image: $(this).data('item-img'),
            quantity: parseInt($(this).closest('.item-add-block').find('.counter-value').val())
        };
        addToCart(item);

        $(`.item-add-btn[data-item-id="${$(this).data('item-id')}"]`).html(`
            <ion-gird>
                <ion-row class="d-block">
                    <ion-col size="6" style="vertical-align: super;">
                        ${parseInt($(this).closest('.item-add-block').find('.counter-value').val())}
                    </ion-col>
                    <ion-col size="6">
                        <ion-icon name="create"></ion-icon>
                                                <span style="vertical-align: super;">Edit</span>
                    </ion-col>
                </ion-row>
            </ion-gird>
            `)
        $(`.add-to-cart-btn[data-item-id="${$(this).data('item-id')}"]`).text('Update')
                                            
        if (parseInt($(this).closest('.item-add-block').find('.counter-value').val()) < 1){
            $('.add-to-cart-btn').removeClass("delete-from-cart");
            $('.add-to-cart-btn').text("Add");
            $(`.counter-value[data-item-id="${$(this).data('item-id')}"]`).val(1);


            $(`.item-add-btn[data-item-id="${$(this).data('item-id')}"]`).html(`<ion-icon name="add-outline"></ion-icon>
                Add`)

            $(`.add-to-cart-btn[data-item-id="${$(this).data('item-id')}"]`).text('Add')
        }


        let cart =  JSON.parse(localStorage.getItem('cart'));
        showNextButton(cart, $('.restaurant-name').data('rest-id'))

        let modals = document.querySelectorAll('ion-modal');
        modals.forEach(modal => {
            modal.dismiss(null, 'cancel');
        });
    });

    let modals = document.querySelectorAll('ion-modal');
    modals.forEach(modal => {
        modal.initialBreakpoint = 1;
        modal.breakpoints = [0, 1];
    });
    

}
function handleScroll() {
    const content = document.querySelector('ion-content');
    content.scrollEvents = true;


    content.addEventListener('ionScroll', (ev) => {
        let currentCategory = null;
        

        
        const categories = document.querySelectorAll('.cat-block'); // Moved inside the event listener
        categories.forEach((category) => {
            const rect = category.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentCategory = category.id.split('-')[1];
            }
        });

        if (currentCategory) {
            $('#categories').val(currentCategory)
        }
    });
}

function startScrollHandlerAfterLoading() {
    const menuList = document.getElementById('menu_list');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                // Once the .cat-block elements are added, start the scroll handler
                if (menuList.querySelector('.cat-block')) {
                    handleScroll();


                    


                    observer.disconnect(); // Stop observing once elements are loaded
                }
            }
        });
    });

    observer.observe(menuList, { childList: true, subtree: true });
    
}

function getCart(restaurant_Id) {
    let cart = localStorage.getItem('cart');
    let rest_id = localStorage.getItem('rest_id');
    if (cart) {
        if (rest_id != restaurant_Id) {
            localStorage.setItem("cart", '{"items": {}}')
        }
    }
    else {
        localStorage.setItem("cart", '{"items": {}}')
    }
    localStorage.setItem("rest_id", restaurant_Id)

    
}

function addToCart(item) {
    let cart =  JSON.parse(localStorage.getItem('cart'));


    if (cart.items[Object.keys(item)[0]]) {
        if (item[Object.keys(item)[0]].quantity < 1){
            delete cart.items[Object.keys(item)[0]]
        }
        else{
            cart.items = {...cart.items, ...item}
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    else {
        cart.items = {...cart.items, ...item}
        localStorage.setItem('cart', JSON.stringify(cart))

    }
}

function showNextButton(cart, rest_id) {
    let totalCount = 0;
    let totalPrice = 0;

    Object.values(cart.items).forEach(item => {
        totalCount += item.quantity;
        totalPrice += item.quantity * item.price;
    });

    if (totalCount > 0) {
        $("ion-footer").html(`
            <div class="next-div-container">
                <ion-router-link href="/${rest_id}/cart">
                    <button class="next-btn">
                        <ion-grid>
                            <ion-row>
                                <ion-col size="4" class="next-btn-count">${totalCount} items</ion-col>
                                <ion-col size="4">Next</ion-col>
                                <ion-col size="4" class="next-btn-price">${totalPrice} ₸</ion-col>
                            </ion-row>
                        </ion-grid>
                    </button>
                </ion-router-link>
              </div>
        `);
    } else {
        $("ion-footer").html("");
    }
}




export default class Menu extends HTMLElement {
    
    connectedCallback() {
        this.render();
    

        const restaurant__id = this.restaurant_Id
        getCart(this.restaurant_Id)


        function get_categories(menu_id) {
            return new Promise((resolve, reject) => {
                var settings = {
                    "url": `${API_URL}/api/menu/category/${menu_id}`,
                    "method": "GET",
                };
                
                $.ajax(settings).done(function (response) {
                    let html_res = ``;
                    response.forEach(item => {
                        html_res += `<ion-segment-button value="${item.name}" id="categories-btns" cat="${item.name}">
                                        <ion-label>${item.name}</ion-label>
                                     </ion-segment-button>`;
                    });
        
                    $("#category_select").html(`
                        <ion-segment scrollable="true" value="${response[0].name}" class="categories" id="categories">
                            ${html_res}
                        </ion-segment>
                        `);
                    $("#category_select").val(response[0].id);
        
                    // Resolve the promise with the response
                    resolve(response);
                }).fail(function (error) {
                    // Reject the promise if there's an error
                    reject(error);
                });
            });
        }
        

        
        function renderMenu(menu_id, list) {
            let list_ids = []
            list.forEach(item => {
                list_ids.push(item.id)
            })

            var settings = {
                "url": `${API_URL}/api/menu/item/${menu_id}`,
                "method": "GET",
            };

            $.ajax(settings).done(function (data) {
                const categories = {};
                let cart = JSON.parse(localStorage.getItem('cart'));

                showNextButton(cart, restaurant__id)

                data.forEach(item => {
                    item.category.forEach(cat => {
                        if (list_ids.includes(cat.id)){
                            const categoryName = cat.name;
                
                            if (!categories[categoryName]) {
                                categories[categoryName] = [];
                            }
                            
                            categories[categoryName].push(item);
                }});
                });

                let html_res = ``
                Object.entries(categories).forEach(([i, b]) => {
                    let items = []
                    let items_group = []
                    let counter = 0
                    b.forEach(item => {
                        if (counter > 1){
                            counter = 0;
                            items.push(items_group)
                            items_group = []
                        }

                        items_group.push(item)
                        counter++
                    })
                    items.push(items_group)

                    let html_group = ``
                    items.forEach(group => {
                        let html_row = ``
                        group.forEach(item => {
                            let unique_id = Math.floor(Math.random() * 100)
                            let inCart = cart.items[`id-${item.id}`];
                            let buttonText = inCart ? `<ion-gird>
                <ion-row class="d-block">
                    <ion-col size="6" style="vertical-align: super;">
                        ${inCart.quantity}
                    </ion-col>
                    <ion-col size="6">
                        <ion-icon name="create"></ion-icon>
                                                <span style="vertical-align: super;">Edit</span>
                    </ion-col>
                </ion-row>
            </ion-gird>` : '<ion-icon name="add-outline"></ion-icon> Add';
                            html_row = html_row + `
                            
                            <ion-col size="6">
                                <ion-card class="item-card" mode="ios">
                                    <img alt="Photo" src="${item.image ? item.image : "./media/sample/71908.png" }" class="item-img" />
                                    <ion-card-header class="py-2 px-2">
                                    <ion-card-title class="item-name">${item.name}</ion-card-title>
                                    <ion-card-subtitle class="item-price">${item.price} ₸</ion-card-subtitle>
                                    </ion-card-header>
                                
                                    <ion-card-content class="pb-0 px-2 small">
                                    - g (- kcal)
                                    </ion-card-content>

                                    <div class="item-add">
                                        <ion-button id="open-modal-${item.id}-${unique_id}" expand="block1" size="small" class="item-add-btn" data-item-id="${item.id}">
                                            ${buttonText}
                                        </ion-button>
                                    </div>

                                    <ion-modal trigger="open-modal-${item.id}-${unique_id}">
                                        <div class="block1 block">
                                            <ion-content>
                                                <img alt="Silhouette of mountains" src="${item.image ? item.image : "./media/sample/71908.png" }" />
                                                <div class="description-block">
                                                    ${item.description}

                                                    <p class="text-secondary fw-bold small pt-2 mb-1">Ingredients</p>
                                                    ${item.composition}
                                                </div>

                                                <div class="item-add-block">
                                                    <ion-grid>
                                                        <ion-row>
                                                        <ion-col size="auto" class="align-content-end">${item.name}</ion-col>
                                                        <ion-col size="auto" class="text-secondary align-content-end">- g</ion-col>
                                                        <ion-col class="text-end align-content-end">${item.price} ₸</ion-col>
                                                        </ion-row>
                                                    
                                                        <ion-row class="add-group-btns">
                                                        <ion-col size="5">
                                                            <div class="counter">
                                                                <button class="btn-decrement disabled" data-item-id="${item.id}">
                                                                    <ion-icon name="remove-outline"></ion-icon>
                                                                </button>

                                                                <input type="text" class="counter-value" value="${inCart ? inCart.quantity : 1}" readonly data-item-id="${item.id}">
                                                                <button class="btn-increment" data-item-id="${item.id}">
                                                                    <ion-icon name="add-outline"></ion-icon>
                                                                </button>
                                                            </div>
                                                        </ion-col>
                                                        <ion-col size="7">
                                                            <button class="add-to-cart-btn" data-item-id="${item.id}" data-item-name="${item.name}" data-item-price="${item.price}" data-item-img="${item.image}">
                                                                ${inCart ? "Update" : "Add"}
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
                            `;
                        })

                        html_group = html_group + `
                            <ion-row>
                                ${html_row}
                            </ion-row>
                        `;

                    })
                    html_res = html_res + `
                    <ion-grid id="cat-${i}" class="cat-block">
                        <h2 class="category-name">${i}</h2>
                        ${html_group}
                    </ion-grid>
                    `;
                    

                })

                $("#menu_list").html(html_res)
                let modals = document.querySelectorAll('ion-modal');

                modals.forEach(modal => {
                    modal.initialBreakpoint = 1;
                    modal.breakpoints = [0, 1];
                });

                });

                
            
        }
        

        var settings = {
            "url": `${API_URL}/api/restaurant/${this.restaurant_Id}`,
            "method": "GET",
          };
          
          $.ajax(settings).done(function (response) {
            localStorage.setItem("organization_id", response.organization.id)
            $(".restaurant-info").html(`
                <ion-grid>
                    <ion-row class="">
                        <ion-col size="8" style="align-self: end;">
                            <h1 class="restaurant-name" data-rest-id="${restaurant__id}">${response.organization.name} ${response.name}</h1>
                            
                                <ion-grid class="mt-3 p-0">
                                    <ion-row>
                                    <ion-col size="auto" class="px-0"><ion-icon name="time" class="align-baseline"></ion-icon></ion-col>
                                    <ion-col class="align-middle px-2"><h6 class="work-time">${response.work_time_open.slice(0, -3)} - ${response.work_time_close.slice(0, -3)}</h6></ion-col>

                                    </ion-row>
                                </ion-grid>
                        </ion-col>
                        <ion-col size="4">
                            <ion-avatar>
                                <img alt="img" src="${response.organization.image}" />
                            </ion-avatar>
                                
                        </ion-col>
                    </ion-row>
                </ion-grid>
               
                
            `)
          })

        
        var settings = {
            "url": `${API_URL}/api/menu/${this.restaurant_Id}`,
            "method": "GET",
          };
        

        $.ajax(settings).done(function (response) {
            let html_res = ``
            
            response.forEach(response => {
                html_res = html_res + `<ion-segment-button value="${response.name}" id="${response.id}">
                                            <ion-label>${response.name} Menu</ion-label>
                                        </ion-segment-button>`
            })
            $("#menu_select").html(`
                <ion-segment scrollable="true" value="${response[0].name}" class="categories">
                    ${html_res}
                </ion-segment>
                `)
            $("#menu_select").val(response[0].id)
            get_categories(response[0].id)
            .then(response_cat => {
                renderMenu(response[0].id, response_cat)

            })

            

            $(document).ready(function() {
                $('ion-segment-button').on('click', function(e) {

                    get_categories(e.target.id)
                    .then(response => {
                        $("#menu_list").html(`<ion-spinner name="crescent" class="loading-spinner"></ion-spinner>`)
                        renderMenu(e.target.id, response) 
                    })

                });
                
            });
            startScrollHandlerAfterLoading()
            modal_work() 
        })
    }
    
    render() {
        // Get the hash part of the URL, which includes the query parameters
        const hash = window.location.hash;

        // Extract the part after the `?` to get the query string
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';

        // Use URLSearchParams to parse the query string
        const searchParams = new URLSearchParams(queryString);

        // Retrieve the 'table' parameter value
        const tableValue = searchParams.get('table');

        localStorage.setItem("table", tableValue)
        
        if (tableValue) {
            this.innerHTML = `
            <ion-content scrollEvents="true" ionScroll=>
        
            <div class="restaurant-info">
                <ion-spinner name="crescent" class="loading-spinner"></ion-spinner>
            </div>
            <div class="nav-menu" mode="ios">
                <div id="menu_select">
                    <ion-spinner name="crescent" class="loading-spinner"></ion-spinner>
                </div>
                <div id="category_select">
                    <ion-segment scrollable="true" value="coffee" class="categories" >
                        
                    </ion-segment>
                </div>
            </div>
        
            <div id="menu_list">
                <ion-spinner name="crescent" class="loading-spinner"></ion-spinner>
            </div>
            
            </ion-content>
            <ion-footer>
            
            </ion-footer>`;
        }
        else {
            this.innerHTML = `
            <ion-content scrollEvents="true" ionScroll=>
        
            <div class="restaurant-info">
                <ion-spinner name="crescent" class="loading-spinner"></ion-spinner>
            </div>
            <div class="nav-menu" mode="ios">
                <div id="menu_select">
                    <ion-spinner name="crescent" class="loading-spinner"></ion-spinner>
                </div>
                <div id="category_select">
                    <ion-segment scrollable="true" value="coffee" class="categories" >
                        
                    </ion-segment>
                </div>
            </div>
        
            <div id="menu_list">
                <ion-spinner name="crescent" class="loading-spinner"></ion-spinner>
            </div>
            
            </ion-content>`;
        }
    }
    
    
}

customElements.define('nav-menu', Menu)