function getDisplayPrice (priceInCents) {
  return '$' + priceInCents / 100;
};

/*
Shop class
properties:
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
properties:
- storage (map, key: item.name, value: int)
methods:
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
properties:
- name
- priceInCents
- details
- pictureUrl
methods:
- getDisplayPrice
*/

function Item (name, priceInCents, details, pictureUrl) {
  this.name = name;
  this.priceInCents = priceInCents;
  this.details = details;
  this.pictureUrl = pictureUrl;
}

function renderItems (items, inventory) {

}

/*
Cart class
properties:
- items
methods:
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
    alert(`The shop only has ${quantityInStock} in stock`)
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

function renderCart (cart) {

}

// Needed for initial render when the page is loaded.
renderItems();
renderCart();
