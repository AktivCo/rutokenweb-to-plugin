// должна отвечать интерфейсу:
// входной параметр - список токенов для отображения
// возвращает объект токена с айди и пином { id , pin }
function $pinResolver(tokens) {
    return new Promise(function (resolve, reject) {
        var tokenpin = $('#tokenpin');
        var tokenpin_tokens = $('#tokenpin_tokens');

        tokenpin_tokens.empty();
        tokens.forEach(function (token, i) {
            var token_select = $('<input type="radio" name="token_select" id="token' + token + '" value="' + i + '" />');
            var token_select_label = $('<label for="token' + token + '">' + token + '</label>');
            token_select.appendTo(tokenpin_tokens);
            token_select_label.appendTo(tokenpin_tokens);
            $('<br />').appendTo(tokenpin_tokens);
        });

        var tokenpin_value = $('#tokenpin_value');

        tokenpin.show();
        $('#tokenpin_enter').unbind('click');
        $('#tokenpin_enter').bind('click', function (evt) {
            var id = $('input[name=token_select]:checked').val();
            var pin = tokenpin_value.val();

            if (typeof id !== 'undefined' && pin) {
                resolve({
                    id: id,
                    pin: pin
                });
                tokenpin.hide();
            } else {
                reject();
            }
        });

    });
}