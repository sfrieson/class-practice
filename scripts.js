/*
Store class
properties:
- items
- inventory
- cart
*/

function Store () {
  this.inventory = new Inventory();
  this.items = new Set();
  this.cart = new Cart();
}

Store.prototype.addItem = function (name, quantity) {

};

/*
Inventory Class
properties:
- store (map, key: item.name, value: int)
methods:
- addItem
- remove
- replenish
- getItemInventory
*/

function Inventory () {
  this.store = {};
}

Inventory.prototype.addItem = function (name, quantity) {

};

Inventory.prototype.remove = function (quantity) {

};

Inventory.prototype.replenish = function (quantity) {

};

Inventory.prototype.getItemInventory = function (name); {

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

Item.prototype.getDisplayPrice = function () {

};

function renderItems (items, inventory) {

}

/*
Cart class
properties:
- items
methods:
- addItem
- save
- load
- getTotal
- getItemCount
*/

function Cart () {
  this.items = [];
}

Cart.prototype.addItem = function (item, quantity) {

};

Cart.prototype.save = function () {

};

Cart.prototype.load = function () {

};

Cart.prototype.getTotal = function () {

};

Cart.prototype.getItemCount = function () {

};

function renderCart (cart) {

}

// Needed for initial render when the page is loaded.
renderItems();
renderCart();
