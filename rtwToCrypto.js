function CryptoPlugin(plugin, pinResolver) {

    this.errorDescription = [];
    if (!plugin.valid) {
        throw 'Не удается получить объект плагина';
    }

    this.pluginObject = plugin;

    var currentDevice = {},
        options = {
            useHardwareHash: false,
            computeHash: false,
            hashAlgorithm: plugin.HASH_TYPE_GOST3411_94
        };

    for (var key in this.pluginObject) {
        this[key] = this.pluginObject[key];
    }

    this.errorCodes = plugin.errorCodes;

    this.errorDescription[this.errorCodes.UNKNOWN_ERROR] = "Неизвестная ошибка";
    this.errorDescription[this.errorCodes.BAD_PARAMS] = "Неправильные параметры";
    this.errorDescription[this.errorCodes.NOT_ENOUGH_MEMORY] = "Недостаточно памяти";
    this.errorDescription[this.errorCodes.DEVICE_NOT_FOUND] = "Устройство не найдено";
    this.errorDescription[this.errorCodes.DEVICE_ERROR] = "Ошибка устройства";
    this.errorDescription[this.errorCodes.TOKEN_INVALID] = "Ошибка чтения/записи устройства. Возможно, устройство было извлечено. Попробуйте выполнить enumerate";
    this.errorDescription[this.errorCodes.CERTIFICATE_CATEGORY_BAD] = "Недопустимый тип сертификата";
    this.errorDescription[this.errorCodes.CERTIFICATE_EXISTS] = "Сертификат уже существует на устройстве";
    this.errorDescription[this.errorCodes.CERTIFICATE_NOT_FOUND] = "Сертификат не найден";
    this.errorDescription[this.errorCodes.CERTIFICATE_HASH_NOT_UNIQUE] = "Хэш сертификата не уникален";
    this.errorDescription[this.errorCodes.CA_CERTIFICATES_NOT_FOUND] = "Корневые сертификаты не найдены";
    this.errorDescription[this.errorCodes.CERTIFICATE_VERIFICATION_ERROR] = "Ошибка проверки сертификата";
    this.errorDescription[this.errorCodes.PKCS11_LOAD_FAILED] = "Не удалось загрузить PKCS#11 библиотеку";
    this.errorDescription[this.errorCodes.PIN_LENGTH_INVALID] = "Некорректная длина PIN-кода";
    this.errorDescription[this.errorCodes.PIN_INCORRECT] = "Некорректный PIN-код";
    this.errorDescription[this.errorCodes.PIN_LOCKED] = "PIN-код заблокирован";
    this.errorDescription[this.errorCodes.PIN_CHANGED] = "PIN-код был изменен";
    this.errorDescription[this.errorCodes.SESSION_INVALID] = "Состояние токена изменилось";
    this.errorDescription[this.errorCodes.USER_NOT_LOGGED_IN] = "Выполните вход на устройство";
    this.errorDescription[this.errorCodes.ALREADY_LOGGED_IN] = "Вход на устройство уже был выполнен";
    this.errorDescription[this.errorCodes.ATTRIBUTE_READ_ONLY] = "Свойство не может быть изменено";
    this.errorDescription[this.errorCodes.KEY_NOT_FOUND] = "Соответствующая сертификату ключевая пара не найдена";
    this.errorDescription[this.errorCodes.KEY_ID_NOT_UNIQUE] = "Идентификатор ключевой пары не уникален";
    this.errorDescription[this.errorCodes.CEK_NOT_AUTHENTIC] = "Выбран неправильный ключ";
    this.errorDescription[this.errorCodes.KEY_LABEL_NOT_UNIQUE] = "Метка ключевой пары не уникальна";
    this.errorDescription[this.errorCodes.WRONG_KEY_TYPE] = "Неправильный тип ключа";
    this.errorDescription[this.errorCodes.LICENCE_READ_ONLY] = "Лицензия доступна только для чтения";
    this.errorDescription[this.errorCodes.DATA_INVALID] = "Неверные данные";
    this.errorDescription[this.errorCodes.UNSUPPORTED_BY_TOKEN] = "Операция не поддерживается токеном";
    this.errorDescription[this.errorCodes.KEY_FUNCTION_NOT_PERMITTED] = "Операция запрещена для данного типа ключа";
    this.errorDescription[this.errorCodes.BASE64_DECODE_FAILED] = "Ошибка декодирования даных из BASE64";
    this.errorDescription[this.errorCodes.PEM_ERROR] = "Ошибка разбора PEM";
    this.errorDescription[this.errorCodes.ASN1_ERROR] = "Ошибка декодирования ASN1 структуры";
    this.errorDescription[this.errorCodes.FUNCTION_REJECTED] = "Операция отклонена пользователем";
    this.errorDescription[this.errorCodes.FUNCTION_FAILED] = "Невозможно выполнить операцию";
    this.errorDescription[this.errorCodes.MECHANISM_INVALID] = "Указан неправильный механизм";
    this.errorDescription[this.errorCodes.ATTRIBUTE_VALUE_INVALID] = "Передан неверный атрибут";
    this.errorDescription[this.errorCodes.X509_UNABLE_TO_GET_ISSUER_CERT] = "Невозможно получить сертификат подписанта";
    this.errorDescription[this.errorCodes.X509_UNABLE_TO_GET_CRL] = "Невозможно получить CRL";
    this.errorDescription[this.errorCodes.X509_UNABLE_TO_DECRYPT_CERT_SIGNATURE] = "Невозможно расшифровать подпись сертификата";
    this.errorDescription[this.errorCodes.X509_UNABLE_TO_DECRYPT_CRL_SIGNATURE] = "Невозможно расшифровать подпись CRL";
    this.errorDescription[this.errorCodes.X509_UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY] = "Невозможно раскодировать открытый ключ эмитента";
    this.errorDescription[this.errorCodes.X509_CERT_SIGNATURE_FAILURE] = "Неверная подпись сертификата";
    this.errorDescription[this.errorCodes.X509_CRL_SIGNATURE_FAILURE] = "Неверная подпись CRL";
    this.errorDescription[this.errorCodes.X509_CERT_NOT_YET_VALID] = "Срок действия сертификата еще не начался";
    this.errorDescription[this.errorCodes.X509_CRL_NOT_YET_VALID] = "Срок действия CRL еще не начался";
    this.errorDescription[this.errorCodes.X509_CERT_HAS_EXPIRED] = "Срок действия сертификата истек";
    this.errorDescription[this.errorCodes.X509_CRL_HAS_EXPIRED] = "Срок действия CRL истек";
    this.errorDescription[this.errorCodes.X509_ERROR_IN_CERT_NOT_BEFORE_FIELD] = "Некорректные данные в поле \"notBefore\" у сертификата";
    this.errorDescription[this.errorCodes.X509_ERROR_IN_CERT_NOT_AFTER_FIELD] = "Некорректные данные в поле \"notAfter\" у сертификата";
    this.errorDescription[this.errorCodes.X509_ERROR_IN_CRL_LAST_UPDATE_FIELD] = "Некорректные данные в поле \"lastUpdate\" у CRL";
    this.errorDescription[this.errorCodes.X509_ERROR_IN_CRL_NEXT_UPDATE_FIELD] = "Некорректные данные в поле \"nextUpdate\" у CRL";
    this.errorDescription[this.errorCodes.X509_OUT_OF_MEM] = "Нехватает памяти";
    this.errorDescription[this.errorCodes.X509_DEPTH_ZERO_SELF_SIGNED_CERT] = "Недоверенный самоподписанный сертификат";
    this.errorDescription[this.errorCodes.X509_SELF_SIGNED_CERT_IN_CHAIN] = "В цепочке обнаружен недоверенный самоподписанный сертификат";
    this.errorDescription[this.errorCodes.X509_UNABLE_TO_GET_ISSUER_CERT_LOCALLY] = "Невозможно получить локальный сертификат подписанта";
    this.errorDescription[this.errorCodes.X509_UNABLE_TO_VERIFY_LEAF_SIGNATURE] = "Невозможно проверить первый сертификат";
    this.errorDescription[this.errorCodes.X509_CERT_CHAIN_TOO_LONG] = "Слишком длинная цепочка сертификатов";
    this.errorDescription[this.errorCodes.X509_CERT_REVOKED] = "Сертификат отозван";
    this.errorDescription[this.errorCodes.X509_INVALID_CA] = "Неверный корневой сертификат";
    this.errorDescription[this.errorCodes.X509_INVALID_NON_CA] = "Неверный некорневой сертфикат, помеченный как корневой";
    this.errorDescription[this.errorCodes.X509_PATH_LENGTH_EXCEEDED] = "Превышена длина пути";
    this.errorDescription[this.errorCodes.X509_PROXY_PATH_LENGTH_EXCEEDED] = "Превышина длина пути прокси";
    this.errorDescription[this.errorCodes.X509_PROXY_CERTIFICATES_NOT_ALLOWED] = "Проксирующие сертификаты недопустимы";
    this.errorDescription[this.errorCodes.X509_INVALID_PURPOSE] = "Неподдерживаемое назначение сертификата";
    this.errorDescription[this.errorCodes.X509_CERT_UNTRUSTED] = "Недоверенный сертификат";
    this.errorDescription[this.errorCodes.X509_CERT_REJECTED] = "Сертифкат отклонен";
    this.errorDescription[this.errorCodes.X509_APPLICATION_VERIFICATION] = "Ошибка проверки приложения";
    this.errorDescription[this.errorCodes.X509_SUBJECT_ISSUER_MISMATCH] = "Несовпадения субьекта и эмитента";
    this.errorDescription[this.errorCodes.X509_AKID_SKID_MISMATCH] = "Несовпадение идентификатора ключа у субьекта и доверенного центра";
    this.errorDescription[this.errorCodes.X509_AKID_ISSUER_SERIAL_MISMATCH] = "Несовпадение серийного номера субьекта и доверенного центра";
    this.errorDescription[this.errorCodes.X509_KEYUSAGE_NO_CERTSIGN] = "Ключ не может быть использован для подписи сертификатов";
    this.errorDescription[this.errorCodes.X509_UNABLE_TO_GET_CRL_ISSUER] = "Невозможно получить CRL подписанта";
    this.errorDescription[this.errorCodes.X509_UNHANDLED_CRITICAL_EXTENSION] = "Неподдерживаемое расширение";
    this.errorDescription[this.errorCodes.X509_KEYUSAGE_NO_CRL_SIGN] = "Ключ не может быть использован для подписи CRL";
    this.errorDescription[this.errorCodes.X509_KEYUSAGE_NO_DIGITAL_SIGNATURE] = "Ключ не может быть использован для цифровой подписи";
    this.errorDescription[this.errorCodes.X509_UNHANDLED_CRITICAL_CRL_EXTENSION] = "Неподдерживаемое расширение CRL";
    this.errorDescription[this.errorCodes.X509_INVALID_EXTENSION] = "Неверное или некорректное расширение сертификата";
    this.errorDescription[this.errorCodes.X509_INVALID_POLICY_EXTENSION] = "Неверное или некорректное расширение политик сертификата";
    this.errorDescription[this.errorCodes.X509_NO_EXPLICIT_POLICY] = "Явные политики отсутствуют";
    this.errorDescription[this.errorCodes.X509_DIFFERENT_CRL_SCOPE] = "Другая область CRL";
    this.errorDescription[this.errorCodes.X509_UNSUPPORTED_EXTENSION_FEATURE] = "Неподдерживаемое расширение возможностей";
    this.errorDescription[this.errorCodes.X509_UNNESTED_RESOURCE] = "RFC 3779 неправильное наследование ресурсов";
    this.errorDescription[this.errorCodes.X509_PERMITTED_VIOLATION] = "Неправильная структура сертифката";
    this.errorDescription[this.errorCodes.X509_EXCLUDED_VIOLATION] = "Неправильная структура сертфиката";
    this.errorDescription[this.errorCodes.X509_SUBTREE_MINMAX] = "Неправильная структура сертифката";
    this.errorDescription[this.errorCodes.X509_UNSUPPORTED_CONSTRAINT_TYPE] = "Неправильная структура сертфиката";
    this.errorDescription[this.errorCodes.X509_UNSUPPORTED_CONSTRAINT_SYNTAX] = "Неправильная структура сертифката";
    this.errorDescription[this.errorCodes.X509_UNSUPPORTED_NAME_SYNTAX] = "Неправильная структура сертфиката";
    this.errorDescription[this.errorCodes.X509_CRL_PATH_VALIDATION_ERROR] = "Неправильный путь CRL";
    this.errorDescription[this.errorCodes.CMS_CERTIFICATE_ALREADY_PRESENT] = "Сертификат уже используется";
    this.errorDescription[this.errorCodes.CANT_HARDWARE_VERIFY_CMS] = "Проверка множественной подписи с вычислением хеша на устройстве не поддерживается";

    this.getError = function (reason) {
        return this.errorDescription[reason.message || reason] || reason;
    };

    this.getConatainerNameFromHex = function (str) {
        return (":" + str).split(':').reduce(function (str, i) {
            return str + String.fromCharCode('0x' + i);
        });
    };

    this.getConatainerHexFromName = function (str) {
        return str.split('').map(function (letter, i) {
            return letter.charCodeAt(0).toString(16);
        }).join(':');
    };

    this.rtwIsTokenPresentAndOK = function () {
        currentDevice = {};
        return plugin.enumerateDevices().then(function (devices) {
            if (devices.length === 0) {
                throw this.errorCodes.DEVICE_NOT_FOUND;
            }
            return Promise.all(devices.map(function (dev) {
                return plugin.getDeviceInfo(dev, plugin.TOKEN_INFO_SERIAL);
            }));
        }).then(function (tokens) {
            return pinResolver(tokens);
        }).then(function (selectedToken) {
            currentDevice = selectedToken;
            return plugin.getDeviceInfo(currentDevice.id, plugin.TOKEN_INFO_IS_LOGGED_IN);
        }).then(function (result) {
            if (result) {
                return plugin.logout(currentDevice.id);
            } else {
                return Promise.resolve(true);
            }
        }).then(function () {
            return plugin.removePin(currentDevice.id);
        }).then(function () {
            return plugin.login(currentDevice.id, currentDevice.pin);
        }).then(function (result) {
            return true;
        }, function (error) {
            plugin.logout();
            throw error;
        });
    };

    this.rtwGetNumberOfContainers = function () {
        return plugin.enumerateKeys(currentDevice.id, '').then(function (result) {
            currentDevice.keys = result;
            return result.length;
        });
    };

    this.rtwGetContainerName = function (containerNumber) {
        return this.getConatainerNameFromHex(currentDevice.keys[containerNumber]);
    };

    this.rtwSign = function (keyName, message) {
        var messageReversed = message.match(/.{2}/g).reverse().join(':');
        var keyId = this.getConatainerHexFromName(keyName);

        return plugin.rawSign(currentDevice.id, keyId, messageReversed, options).then(function (res) {
            var sign = res.split(':').reverse();
            var R = sign.splice(0, sign.length / 2).reverse();
            var S = sign.reverse();
            return R.join('') + S.join('');
        });
    };

}