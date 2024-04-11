let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let items = [];

// Функция для создания формы ввода адреса как всплывающего окна
function createAddressForm() {
    // Создаем элементы формы
    let form = document.createElement('form');
    form.id = 'addressForm';

    let label = document.createElement('label');
    label.for = 'address';
    label.innerText = 'Введите ваш адрес:';
    form.appendChild(label);

    let input = document.createElement('input');
    input.type = 'text';
    input.id = 'address';
    input.name = 'address';
    form.appendChild(input);

    let submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Отправить';
    form.appendChild(submitButton);

    // Добавляем обработчик события отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let address = input.value;
        if (address) {
            let data = {
                items: items,
                totalPrice: calculateTotalPrice(),
                address: address
            };
            // Отправка данных заказа на сервер
            tg.sendData(JSON.stringify(data));
        }
    });

    return form;
}

// Обработка события нажатия на главную кнопку веб-приложения Telegram
Telegram.WebApp.onEvent('mainButtonClicked', function(){
    if (items.length === 0) {
        // Если корзина пуста, показываем сообщение об этом
        tg.sendMessage("Ваша корзина пуста. Пожалуйста, добавьте товары.");
    } else {
        // Если в корзине есть товары, отображаем кнопку "Продолжить"
        let addressForm = createAddressForm();
        tg.MainButton.setText(addressForm);
    }
});

// Функция для добавления или удаления товара из корзины
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

// Функция для обновления общей стоимости товаров
function updateTotalPrice() {
    let totalPrice = calculateTotalPrice();
    if (totalPrice > 0) {
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

// Функция для вычисления общей стоимости товаров в корзине
function calculateTotalPrice() {
    return items.reduce((total, item) => total + item.price, 0);
}

// Обработчики событий нажатия кнопок товаров
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
});
