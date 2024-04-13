let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let items = [];

function toggleItem(btn, itemId, price) {
    let itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
        // Если товар не найден в корзине, добавляем его с количеством 1
        items.push({ id: itemId, price: price, quantity: 1 });
    } else {
        // Если товар найден в корзине, увеличиваем его количество
        items[itemIndex].quantity++;
    }
    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = calculateTotalPrice();
    if (totalPrice > 0) {
        tg.MainButton.setText(`View order: ${totalPrice}`);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

Telegram.WebApp.onEvent('mainButtonClicked', function(){
    let address = document.getElementById("address").value; // Получаем значение адреса из поля ввода
    let data = {
        items: items,
        totalPrice: calculateTotalPrice(),
        address: address // Добавляем адрес в данные
    };
    tg.sendData(JSON.stringify(data)); // Отправляем данные на сервер
})

function calculateTotalPrice() {
    return items.reduce((total, item) => total + item.price * parseInt(document.getElementById(item.id).querySelector('.quantity-control span').innerText), 0);
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
});

function playAnimation(imgId, animationSrc) {
    // Находим элемент изображения
    const img = document.getElementById(imgId);

    // Сохраняем текущий путь изображения для восстановления
    const originalSrc = img.src;

    // Заменяем статическое изображение анимированным GIF
    img.src = animationSrc;

    // Запускаем таймер для возврата к статическому изображению через 3 секунды (или сколько вам нужно)
    setTimeout(function() {
        img.src = originalSrc; // Возвращаем изображение к первоначальному статусу
    }, 3000); // 3000 миллисекунд = 3 секунды
}

function incrementQuantity(quantityId) {
    let quantityElement = document.getElementById(quantityId);
    let quantity = parseInt(quantityElement.innerText);
    quantityElement.innerText = quantity + 1;
    updateTotalPrice(); // Обновляем общую сумму заказа при увеличении количества
}

function decrementQuantity(quantityId) {
    let quantityElement = document.getElementById(quantityId);
    let quantity = parseInt(quantityElement.innerText);
    if (quantity > 0) {
        quantityElement.innerText = quantity - 1;
        updateTotalPrice(); // Обновляем общую сумму заказа при уменьшении количества
    }
}

// Добавляем обработчик события для кнопки "Готово"
document.getElementById("submitAddressBtn").addEventListener('click', function() {
    var address = document.getElementById("address").value;
    var addressField = document.getElementById("address");
    var addressText = document.createElement("p");
    addressText.textContent = "Адрес доставки: " + address;
    addressField.parentNode.replaceChild(addressText, addressField);
    
    // Скрыть текст "Введите ваш адрес"
    var placeholderText = document.querySelector('label[for="address"]');
    placeholderText.style.display = 'none';
});
