/*
Store class
properties:
- items
- inventory
- cart
*/

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

/*
Item class
properties:
- name
- price
- details
- pictureUrl
- quantity
*/

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

function renderCart (cart) {

}

// Needed for initial render when the page is loaded.
renderItems();
renderCart();
