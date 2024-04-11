let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let items = [];

var addButtons = document.querySelectorAll('.btn');

// Функция для отображения заказа
function showOrderSummary() {
    document.getElementById('order-summary').style.display = 'block';

    // Очищаем предыдущий список товаров
    document.getElementById('order-items').innerHTML = '';

    // Создаем новый список товаров
    items.forEach(item => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.id} - ${item.price}Р`;
        document.getElementById('order-items').appendChild(listItem);
    });

    // Обновляем общую сумму
    updateTotalPrice();

    // Показываем форму оплаты
    document.getElementById('payment-form').style.display = 'block';
}

// Функция для обработки отправки формы оплаты
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем данные из формы
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let paymentMethod = document.getElementById('payment-method').value;

    // Здесь вы можете отправить данные о заказе и оплате с помощью API Telegram Web App

    // После успешной оплаты можно показать сообщение об успешной оплате или перенаправить пользователя на страницу подтверждения заказа
    alert('Спасибо за заказ!');

    // Очищаем корзину и скрываем форму оплаты
    items = [];
    updateTotalPrice();
    document.getElementById('order-summary').style.display = 'none';
    document.getElementById('payment-form').style.display = 'none';
});

// Функция для обновления общей суммы заказа
function updateTotalPrice() {
    let totalPrice = calculateTotalPrice();
    document.getElementById('total-price').textContent = `Общая сумма: ${totalPrice}Р`;
}

// Функция для отображения формы оплаты после нажатия кнопки "Просмотр заказа"
document.getElementById('view-order').addEventListener('click', function() {
    showOrderSummary();
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
        tg.MainButton.setText(`Общая цена товаров: ${totalPrice}`);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}



Telegram.WebApp.onEvent('mainButtonClicked', function(){
    let data = {
        items: items,
        totalPrice: calculateTotalPrice()
    };
    tg.sendData(JSON.stringify(data));
});


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
});

