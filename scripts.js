/*
Shop class
  instance properties:
    - items
    - inventory
    - cart
*/

function Shop () {
  this.inventory = new Inventory();
  this.items = {};
}

Shop.prototype.addItem = function (name, priceInCents, details, pictureUrl, quantity) {
  var item = new Item(name, priceInCents, details, pictureUrl);
  this.items[name] = item;
  this.inventory.addItem(name, quantity);
};

Shop.prototype.getItemInventory = function (name) {
  return this.inventory.getItemInventory(name);
};

/*
Inventory Class
  instance properties:
    - storage (map, key: item.name, value: int)
  instance methods:
    - addItem
    - remove
    - replenish
    - getItemInventory
*/

function Inventory () {
  this.storage = {};
}

Inventory.prototype.addItem = function (name, quantity) {
  this.storage[name] = quantity;
};

Inventory.prototype.remove = function (name, quantity) {
  this.storage[name] -= quantity;
};

Inventory.prototype.replenish = function (name, quantity) {
  this.storage[name] += quantity;
};

Inventory.prototype.getItemInventory = function (name) {
  return this.storage[name];
};

/*
Item class
  instance properties:
    - name
    - priceInCents
    - details
    - pictureUrl
  instance methods:
    - getDisplayPrice
*/

function Item (name, priceInCents, details, pictureUrl) {
  this.name = name;
  this.priceInCents = priceInCents;
  this.details = details;
  this.pictureUrl = pictureUrl;
}

/*
Cart class
  instance properties:
    - items
  instance methods:
    - addItem
    - removeItem
    - save
    - load
    - getTotal
    - getItemCount
*/

function Cart (shop) {
  this.shop = shop;
  this.cartItems = [];
}

Cart.prototype.addItem = function (item, quantity) {
  const quantityInStock = this.shop.getItemInventory(item.name);
  if (quantity <= quantityInStock) {
    this.cartItems.push({item: item, quantity: quantity});
  } else {
    window.alert(`The shop only has ${quantityInStock} in stock`);
  }
};

Cart.prototype.removeItem = function (item) {
  for (let x = 0; x < this.cartItems.length; x++) {
    if (this.cartItems[x] === item) {
      this.cartItems.splice(x, 1);
    }
  }
};

Cart.prototype.save = function () {

};

Cart.prototype.load = function () {

};

Cart.prototype.getTotal = function () {
  return this.cartItems.reduce(function (sum, cartItem) {
    sum += cartItem.item.priceInCents;
    return sum;
  }, 0);
};

Cart.prototype.getItemCount = function () {
  return this.cartItems.reduce(function (count, cartItem) {
    count += cartItem.quantity;
    return count;
  }, 0);
};

Cart.prototype.purchase = function () {
  for (let cartItem of this.cartItems) {
    this.shop.inventory.remove(cartItem.name, cartItem.quantity);
  }
  this.cartItems = [];
};

/*
UI class
  instance properties:
    - shop
    - cart
    - shopListEl
    - cartListEl
    - basketDetailsButtonEl
    - buyButtonEl
  instance methods:
    - render
    - renderCartItems
    - renderShopItems
  class properties:
    - DOMquery (jQuery)
  class methods:
    - formatPriceString
*/

function UI (shopItemListId, cartItemListId, basketDetails, buyButtonId, shop, cart) {
  this.shopList = UI.DOMquery('#' + shopItemListId);
  this.cartList = UI.DOMquery('#' + cartItemListId);
  this.basketDetails = UI.DOMquery('#' + basketDetails);
  this.buyButton = UI.DOMquery('#' + buyButtonId);
  this.shop = shop;
  this.cart = cart;
}

UI.prototype.render = function () {
  this.renderShopItems();
  this.renderCartItems();
};

UI.prototype.renderShopItems = function () {
  this.shopList.empty();
  for (let itemKey in this.shop.items) {
    const item = this.shop.items[itemKey];
    const itemEl = UI.DOMquery(`
      <li class='item'>
        <h3 class='item__name'>${item.name}</h3>
        <span class='item__price'>${UI.formatPriceString(item.priceInCents)}</span>
        <p class='item__details'>${item.details}</p>
        <img class='item__image' alt='${item.name}' src='/img/${item.pictureUrl}' />
      </li>
      `);
    const buttonEl = UI.DOMquery('<button class="item__add-button">Add to cart</button>');
    buttonEl.click( () => {
      this.cart.addItem(item, 1);
      this.render();
    });
    itemEl.append(buttonEl);
    this.shopList.append(itemEl);
  }
};

UI.prototype.renderCartItems = function () {
  this.cartList.empty();
  for (let cartItem of this.cart.cartItems) {
    const itemEl = UI.DOMquery(`
      <li class='item'>
        <h3 class='item__name'>${cartItem.item.name}</h3>
        <span class='item__price'>${UI.formatPriceString(cartItem.item.priceInCents)}</span>
        <img class='item__image' alt='${cartItem.item.name}' src='/img/${cartItem.item.pictureUrl}' />
      </li>
      `);
    const buttonEl = UI.DOMquery('<button class="remove-item">Remove</button>');
    buttonEl.click(() => {
      this.cart.removeItem(cartItem);
      this.render();
    });
    itemEl.append(buttonEl);
    this.cartList.append(itemEl);
  }
};

UI.DOMquery = $; // eslint-disable-line

UI.formatPriceString = function (priceInCents) {
  return '$' + (priceInCents / 100).toFixed(2);
};

// TODO Remove these globals later. They're for debugging
var shop;
var cart;

(function init () {
  shop = new Shop();

  shop.addItem('avocado', 100, 'Buttery Hass avocados direct from California. Perfect for all your guacamole, salad, smoothie, and sandwich needs.', 'avocados.jpg', 10);
  shop.addItem('leek', 150, '***Organic!*** Locally grown leeks are in-season and ready for you to buy them!', 'leek.jpg', 25);
  cart = new Cart(shop);

  var ui = new UI('items', 'basket', 'basket-details', 'checkout-button', shop, cart);
  ui.render();
})();
