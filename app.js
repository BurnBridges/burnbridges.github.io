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
    // Отправляем данные на сервер, а затем перенаправляем пользователя на новую страницу
    fetch('https://burnbridges.github.io/address.html', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            window.location.href = "https://burnbridges.github.io/address.html";
        } else {
            console.error('Ошибка при отправке данных на сервер');
            // Здесь можно обработать ошибку, например, показать пользователю сообщение об ошибке
        }
    }).catch(error => {
        console.error('Ошибка:', error);
    });
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
