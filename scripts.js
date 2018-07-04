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

function UI (shopItemListId, cartItemListId, basketDetailsButton, buyButtonId, shop, cart) {

}

UI.prototype.render = function () {
  this.renderShopItems();
  this.renderCartItems();
};

UI.prototype.renderShopItems = function () {
  /*
    <li class='item'>
      <h3 id='item.name' class='item__name'>Name</h3>
      <span id='item.price' class='item__price'>$12.99</span>
      <p id='item.details' class='item__details'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit ab, est, possimus ipsam minus dolorem laudantium, maiores maxime sequi itaque veritatis! Repellendus sed architecto consequuntur nisi quibusdam ratione. Perspiciatis, sequi.</p>
      <img id='item.pictureUrl' class='item__image' alt='item.name' />
      <button class='item__add-button'>Add to cart</button>
    </li>
  */
};

UI.prototype.renderCartItems = function () {
  /*
    <li class='item'>
      <h3 id='item.name' class='item__name'>Name</h3>
      <span id='item.price' class='item__price'>$12.99</span>
      <img id='item.pictureUrl' class='item__image' alt='item.name' />
      <button class='remove-item'>Remove</button>
    </li>
  */
};

UI.DOMquery = $; // eslint-disable-line

UI.formatPriceString = function (priceInCents) {
  return '$' + priceInCents / 100;
};

// TODO Remove these globals later. They're for debugging
var shop;
var cart;

(function init () {
  shop = new Shop();

  shop.addItem('avocado', 100, 'Hass', 'avocados.jpg', 10);
  cart = new Cart(shop);

  var ui = new UI('items', 'basket', 'basket-details', 'checkout-button', shop, cart);
  ui.render();
})();
