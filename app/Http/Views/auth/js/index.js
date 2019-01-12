const login = Vue.component('login', {
    data() {
        return {
            auth: {
                step:1,
                alertbox: {
                    message:'',
                    type:'info'
                }
            },

            user: {
                name: '',
                email: '',
                cpf: '',
                nickname:'',
                picture:'',
                login:'',
                password:'',
                remember:false
            },

            users: []
        }
    },

    methods: {
        next() {
            const login = this.user.login;

            if (login.length) {
                this.auth.step = 2
            } else {
                this.alertbox("você precisa informar uma conta de acesso para prosseguir.", "danger")
            }
        },
        
        enter() {
            // axios
        },
        
        list() {
            this.auth.step = 3

        },

        nolist() {
            this.auth.step = 1
        },

        forget() {
            this.auth.step = 4
        },

        cancel(step = 1) {
            this.auth.step = step
        },

        alertbox(message = '', type = 'info') {
            this.auth.alertbox.message = message;
            this.auth.alertbox.type = type;
        },

        reset() {
            // reseta todos os objetos para o padrão
        },

        resetUser() {
            // reseta apenas o objeto do usuario
        },

        remove(user) {
            // remove um usuario do localstorage
        },

        add(user) {
            // adiciona um usuário ao localstorage
        },

        getUser(user) {
            // verifica se o usuário existe no localstorage
        },

        getUsers() {
            // retorna todos os usuarios do localstorage
        }


    },

    computed: {
        compiledAlertbox() {
            return {
                template: `<div class="alert alert-${this.auth.alertbox.type} alert-dismissible" role="alert">
                                <p>${this.auth.alertbox.message}</p>
                                <button type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true" class="fa fa-close"></span>
                                </button>
                            </div>`
            }
        }
    },

    mounted() {

    }
});