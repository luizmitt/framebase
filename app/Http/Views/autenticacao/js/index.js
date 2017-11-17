$(document).ready(function(){

    $("#entrar").on('click', function(){
        if(validar(".form-login")) {
            $(this).find('i').removeClass('fa-sign-in').addClass('fa-spinner fa-spin');
            $("form").submit();
            $(this).prop('disabled', true);
            $(this).find('span').html('Entrando...');
        }
    });

    // abre o modal para alterar a senha
    $("#as_btn_modal").on("click", function(E) {
        $("#as_modal").modal('show');
    });

    // acao para tentar alterar a senha
    $("#btn_alterar_senha").on("click", function(E) {
        $(this).find('i').removeClass('fa fa-sign-in').addClass('fa fa-spinner fa-spin');
        var username         = $("#as_username").val();
        var password_current = $("#as_current_password").val();
        var password_new     = $("#as_new_password").val();
        var password_confirm = $("#as_new_confirm_password").val();

        $.ajax({
            type: 'POST',
            url: url + 'autenticacao/alterarSenha',
            data: {
                username:         username,
                password_current: password_current,
                password_new:     password_new,
                password_confirm: password_confirm,
            },
            success: function(data) {
                var data = JSON.parse(data);
                if(data.erro) {
                    $("#msg_error").html('Não foi possível alterar a sua senha, contante a equipe dos sistemas pmm. ERRO: ' + data.erro);
                    $("#alert_error").show();
                    $("#btn_alterar_senha").find('i').removeClass('fa fa-spinner fa-spin');
                } else {
                    location.pathname = location.pathname + '/validarSenha';
                }
            },
            error: function(data) {
                var data = JSON.parse(data.responseText);
                $("#msg_error").html('Não foi possível alterar a sua senha, contante a equipe dos sistemas pmm. ERRO: ' + data.error.message);
                $("#alert_error").show();
                $("#btn_alterar_senha").find('i').removeClass('fa fa-spinner fa-spin');
            }
        });
    });

});

// exp reg oara no minimo 6 caracteres
var min6c   =  /^[a-zA-Z0-9]{6,}$/;
// exp reg para no minimo 1 letra minuscula
var min1lmi = /(?=[a-z]{1,})[a-zA-Z0-9]+/;
// exp reg para no minimo 1 letra maiuscula
var min1lma = /(?=[A-Z]{1,})[a-zA-Z0-9]+/;
// exp reg para no minimo 1 numero
var min1nu  = /(?=[0-9]{1,})[a-zA-Z0-9]+/;
// nivel inicial da senha
var nivel   = 'weak';

// variaveis para manipulacao de dados
var senha   = null;
var senha_atual    = null;
var confirma_senha = null;

// so liberada botao se a nova senha estiver confirmada e a senha velha preenchida
$("#as_new_confirm_password").on("keyup change", function(E) {
    confirma_senha = $(this).val();
    senha_atual    = (!senha_atual) ? $("#as_current_password").val() : senha_atual;

    if(confirma_senha == senha) {
        if(nivel === 'strong' && senha_atual) {
            $("#btn_alterar_senha").removeAttr("disabled");
        } else {
            $("#btn_alterar_senha").attr("disabled", true);
        }
    } else {
        $("#btn_alterar_senha").attr("disabled", true);
    }
});

// mostra o quao forte a senha esta.. so libera se estiver com a barra verde.
$("#as_new_password").on("keyup change", function(E) {
    senha = $(this).val();

    if( min6c.test( senha ) ) {
        $("#bar").css({
            "background-color": "red",
            "width": "25%"
        });
        nivel = 'weak';

        if( min1lmi.test( senha ) ) {
            $("#bar").css({
                "background-color": "orange",
                "width": "50%"
            });
            nivel = 'weak';

            if( min1lma.test( senha ) ) {
                $("#bar").css({
                    "background-color": "yellow",
                    "width": "75%"
                });
                nivel = 'weak';

                if( min1nu.test( senha ) ) {
                    $("#bar").css({
                        "background-color": "green",
                        "width": "100%"
                    });

                    nivel = 'strong';
                } else {
                    $("#bar").css({
                        "background-color": "yellow",
                        "width": "75%"
                    });

                    nivel = 'weak';
                }
            } else {
                $("#bar").css({
                    "background-color": "orange",
                    "width": "50%"
                });

                nivel = 'weak';
            }
        } else {
            $("#bar").css({
                "background-color": "red",
                "width": "25%"
            });

            nivel = 'weak';
        }

    } else {
        $("#bar").css({
            "background-color": "red",
            "width": "0%"
        });

        nivel = 'weak';
    }
});
