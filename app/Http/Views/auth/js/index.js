const alertbox = Vue.component('alertbox', {
    name: 'alertbox',
    props: {
        alertConfig: Object
    },

    template: `<div v-show="message" v-bind:class="type" role="alert">
                    <button type="button" class="close" aria-label="Close" v-on:click="alertConfig.alertbox.message=null"><span aria-hidden="true">&times;</span></button>
                    <span v-html="message"></span>
                </div>`,
    data() {
        return {
            message:this.alertConfig.alertbox.message,
            type:'alert alert-info alert-dismissible alert-' + this.alertConfig.alertbox.type
        }
    },

    watch: {
        'alertConfig.alertbox.message': function (message) {
            this.message = message
        },

        'alertConfig.alertbox.type': function (type) {
            this.type = 'alert alert-info alert-dismissible alert-' + type
        }
    }    
})

const login = Vue.component('login', {
    name:'login',
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
                this.auth.alertbox.message=null
                this.focus('password')
            } else {
                this.alertbox("<strong>Atenção!</strong> É necessário informar uma conta de acesso para prosseguir.", "warning")
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
            this.focus('email')
        },

        cancel(step = 1) {
            this.auth.step = step

            if (step == 1) {
                this.resetUser()
            }
        },

        focus(name, delay=100) {
            setTimeout(() => {
                this.$refs[name].focus()
            }, delay)
        },

        alertbox(message = '', type = 'info') {
            this.auth.alertbox.message = message
            this.auth.alertbox.type = type
        },

        reset() {
            // reseta todos os objetos para o padrão
        },

        resetUser() {
            // reseta apenas o objeto do usuario
            this.user = {
                name: '',
                email: '',
                cpf: '',
                nickname:'',
                picture:'',
                login:'',
                password:'',
                remember:false
            }
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

    },

    mounted() {
        this.focus('username')
    }
})