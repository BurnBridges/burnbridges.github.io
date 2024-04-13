<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <div class="center">
        <div class="container">
            <div class="inner">
                <?php for ($i = 1; $i <= 6; $i++) : ?>
                <div class="item" id="item<?= $i ?>">
                    <img src="burger.png" alt="" class="img" id="burger-img">
                    <p>burger - <b>600Р</b></p>
                    <button class="btn" id="btn<?= $i ?>" onclick="playAnimation('burger-img', 'burger.gif')">Добавить</button>
                </div>
                <?php endfor; ?>
            </div>
        </div>
    </div>

    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <script src="app.js"></script>
</body>
</html>