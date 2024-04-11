let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let items = [];

// Функция для отображения формы ввода адреса
function showAddressForm() {
    let addressForm = `
        <form id="addressForm">
            <label for="address">Введите ваш адрес:</label>
            <input type="text" id="address" name="address">
            <button type="submit">Отправить</button>
        </form>
    `;
    tg.MainButton.setText(addressForm);
}

// Функция для обработки события нажатия на главную кнопку веб-приложения Telegram
Telegram.WebApp.onEvent('mainButtonClicked', function(){
    if (items.length === 0) {
        // Если корзина пуста, показываем сообщение об этом
        tg.sendMessage("Ваша корзина пуста. Пожалуйста, добавьте товары.");
    } else {
        // Если в корзине есть товары, показываем форму ввода адреса
        showAddressForm();
    }
});

// Обработка события отправки формы адреса
document.addEventListener('submit', function(event) {
    event.preventDefault();
    if (event.target.id === 'addressForm') {
        let address = event.target.elements.address.value;
        if (address) {
            let data = {
                items: items,
                totalPrice: calculateTotalPrice(),
                address: address
            };
            // Отправка данных заказа на сервер
            tg.sendData(JSON.stringify(data));
        }
    }
});

function toggleItem(btn, itemId, price) {
    let itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
        items.push({ id: itemId, price: price });
        btn.classList.add('added-to-cart');
        btn.innerText = "Удалить";
    } else {
        items.splice(itemIndex, 1);
        btn.classList.remove('added-to-cart');
        btn.innerText = "Добавить";
    }
    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = calculateTotalPrice();
    if (totalPrice > 0) {
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

function calculateTotalPrice() {
    return items.reduce((total, item) => total + item.price, 0);
}

document.getElementById("btn1").addEventListener('click', function(){
    toggleItem(this, "item1" , 600);
});

document.getElementById("btn2").addEventListener('click', function(){
    toggleItem(this, "item2" , 450);
});

document.getElementById("btn3").addEventListener('click', function(){
    toggleItem(this, "item3" , 580);
});

document.getElementById("btn4").addEventListener('click', function(){
    toggleItem(this, "item4" , 490);
});

document.getElementById("btn5").addEventListener('click', function(){
    toggleItem(this, "item5" , 600);
});

document.getElementById("btn6").addEventListener('click', function(){
    toggleItem(this, "item6" , 610);
