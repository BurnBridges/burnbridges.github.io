from aiogram import Bot, Dispatcher

import asyncio

bot = Bot(token='7064686634:AAHz13iXv4f4U0xsH3ui43bWF75eL0UZH_w')
dp = Dispatcher(bot=bot)


async def main():
    from handlers import dp
    try:
        await dp.start_polling()
    finally:
        await bot.session.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        print('Bot stopped!')
