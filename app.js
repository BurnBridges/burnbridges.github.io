let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let items = [];

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

// Изменяем функцию для открытия всплывающего окна с формой ввода адреса
Telegram.WebApp.onEvent('mainButtonClicked', function(){
    openAddressPopup();
});

function openAddressPopup() {
    tg.showPrompt("Введите ваш адрес:", {
        placeholder: 'Введите ваш адрес',
        okButtonText: 'Отправить',
        cancelButtonText: 'Отмена'
    }).then((result) => {
        if (result && result.text) {
            let address = result.text;
            // Отправляем данные на сервер вместе с адресом
            let data = {
                items: items,
                address: address
            };
            tg.sendData(JSON.stringify(data));
        }
    });
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

function calculateTotalPrice() {
    return items.reduce((total, item) => total + item.price, 0);
}

// Добавим обработчики для нажатия кнопок "Добавить" для каждого товара
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
