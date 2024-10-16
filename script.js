let order = [];
let totalPrice = 0;

function incrementItem(itemName, itemPrice) {
    const quantityElement = document.getElementById(`quantity-${itemName}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    addItem(itemName, itemPrice);
}

function decrementItem(itemName, itemPrice) {
    const quantityElement = document.getElementById(`quantity-${itemName}`);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        removeItem(itemName);
    }
}

function addItem(itemName, itemPrice) {
    let existingItem = order.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        order.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateOrderSummary();
}

function removeItem(itemName) {
    order = order.filter(item => item.name !== itemName);
    updateOrderSummary();
}

function updateOrderSummary() {
    const orderList = document.getElementById('orderList');
    const totalPriceElement = document.getElementById('totalPrice');

    orderList.innerHTML = '';
    totalPrice = 0;

    order.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`;
        orderList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
}

function sendOrder() {
    const restaurantNumber = "+5584988770810";  // Substitua pelo número do restaurante
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;
    const change = document.getElementById('change').value;
    const observations = document.getElementById('observations').value;
    const message = order.map(item => `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`).join('%0A');
    const totalMessage = `Total: R$ ${totalPrice.toFixed(2)}`;
    const paymentMessage = `Forma de pagamento: ${payment}${payment === 'Dinheiro' ? ` (Troco para R$ ${change})` : ''}`;
    const addressMessage = `Endereço: ${address}`;
    const observationsMessage = observations ? `Observações: ${observations}` : '';

    const whatsappUrl = `https://wa.me/${restaurantNumber}?text=Pedido:%0A${message}%0A%0A${totalMessage}%0A%0A${addressMessage}%0A%0A${paymentMessage}%0A%0A${observationsMessage}`;

    window.open(whatsappUrl, '_blank');
}

document.getElementById('payment').addEventListener('change', function () {
    const changeSection = document.getElementById('changeSection');
    if (this.value === 'Dinheiro') {
        changeSection.style.display = 'block';
    } else {
        changeSection.style.display = 'none';
    }
});