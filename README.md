# Модуль-обертка для использования замены плагина Рутокен Web на Рутокен Плагин

* Доступны поиск устройств, выбор, подпись сообщения для логина, генерация ключевой пары.

Пример как перейти на новый плагин, если у вас встроена поддержка Рутокен Web и используется Рутокен Web плагин и серверная часть, работающая с данными, сгенерированными плагином. Предложенная схема позволит минимально изменить клиентский код и не затрагивать серверный. В результате мы получим возможность использовать всю линейку продуктов Рутокен, работающих с Рутокен Плагином и сохраним возможность работы с устройствами Рутокен Web. 


Добавление модуля минимально затрагивает исходный код только клиентской части:
- [rutokenweb.js][rutokenweb.js] меняем на [rutoken.js][rutoken.js]
- добавляем ссылку на модуль [rtwToCrypto.js][rtwToCrypto.js]
- коды ошибок используем новые, доступны с описанием в объекте плагина

## Пример загрузки модуля в файле /sample/script/boot.js

Конструктор модуля принимает параметрами исходный объект плагина и функцию-ресолвер для получения пинкода. Пример ресолвера в файле /sample/script/samplePinResolver.js.

[rtwToCrypto.js]: https://github.com/blade-runner/rutokenweb-to-plugin/blob/master/rtwToCrypto.js
[rutoken.js]: https://github.com/AktivCo/rutoken-plugin-js/blob/master/src/rutoken.js
[rutokenweb.js]: https://github.com/AktivCo/rutokenweb-plugin-js/blob/master/src/rutokenweb.js
