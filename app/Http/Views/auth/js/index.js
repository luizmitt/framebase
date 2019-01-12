const login = Vue.component('login', {
    data() {
        return {
            auth: {
                step:1,
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
            this.auth.step = 2
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

        cancel() {
            this.auth.step = 1
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

    mounted() {

    }
});