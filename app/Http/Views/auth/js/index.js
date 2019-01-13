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
                },
                label: {
                    username:'Conta',
                    username_placeholder:'Informe seu usuário, email pmm ou cpf',
                    remember:'Lembrar - me',
                    next:'Próximo',
                    welcome:'Bem Vindo(a),',
                    password:'Senha',
                    password_placeholder:'Informe a sua senha',
                    environment:'Ambiente',
                    signin:'Entrar',
                    cancel:'Cancelar',
                    send:'Enviar',
                    whoareyou:'Quem é você?',
                    whoareyou_notification:'Existe mais de uma conta registrada neste navegador. Para entrar no sistema, selecione a sua conta:',
                    recover_password:'Recuperar Senha',
                    recover_password_notification:'Para redefinir a senha de sua conta é necessário confirmar o e-mail abaixo:',
                    confirm_email:'Confirmar E-mail',
                    forgot_password:'Esqueceu sua senha?',
                    isnot_you:'Não é você?',
                    remember_users:'Lista de usuários',
                    nolist:'Não estou na lista',
                    environments: [
                        {id:'dev', text:'Desenvolvimento'},
                        {id:'hom', text:'Homologação'},
                        {id:'pro', text:'Produção'}
                    ]
                }
            },

            user: {
                name: '',
                email: '',
                cpf: '',
                login:'',
                picture:'',
                username:'',
                password:'',
                remember:false
            },

            users: []
        }
    },

    methods: {
        next() {
            if (this.user.username.length) {
                
                // axios - pegar dados do usuario e atualiza o this.user
                
                if (this.user.remember) {
                    this.addUser(this.user)
                }
                
                this.auth.alertbox.message=null
                this.auth.step = 2
                this.focus('password')
            } else {
                this.alertbox("<strong>Atenção!</strong> É necessário informar uma conta de acesso para prosseguir.", "warning")
                this.focus('username')
            }
        },
        
        enter() {
            // axios - loga o this.user
        },

        send() {
            // axios - envia um e-mail com o link de recuperacao do this.user. *Necessário acertar o e-mail coringa
        },
        
        list() {
            this.auth.step = 3
        
        },

        nolist() {
            this.resetUser()
            this.auth.step = 1
            this.focus('username')
        },

        forget() {
            this.auth.step = 4
            this.focus('email')
        },

        cancel(step = 1) {
            this.auth.step = step

            if (step == 1) {
                this.resetUser()
                this.focus('username')
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

        reset(cleanStorage = false) {
            // reseta todos os objetos para o padrão
            this.auth.step = 1
            this.auth.alertbox.message = null
            this.auth.alertbox.type = 'info'
            this.user.name = null
            this.user.email = null
            this.user.cpf   = null
            this.user.login = null
            this.user.picture = null
            this.user.username = null
            this.user.password = null
            this.user.remember = false
            this.users = []

            if (cleanStorage) {
                if (localStorage.getItem("auth_users") != null || localStorage.getItem("auth_users") != undefined) {
                    localStorage.removeItem('auth_users')
                }
            }

            this.focus('username')
        },

        resetUser() {
            // reseta apenas o objeto do usuario
            this.user = {
                name: '',
                email: '',
                cpf: '',
                login:'',
                picture:'',
                username:'',
                password:'',
                remember:false
            }
        },

        removeUser(user) {
            // remove um usuario do localstorage
            user = this.getVueObject(user)
            if (this.getUser(user)) {
                var users = this.getUsers() ? this.getUsers() : []
                users.splice(this.getUser(user).index,1)
                this.saveUser(users)
                return true
            }
            return false
        },

        addUser(user) {
            // adiciona um usuário ao localstorage
            user = this.getVueObject(user)
            var users = this.getUsers() ? this.getUsers() : []
            if(!this.getUser(user)) {
                users.push(user)
                this.saveUser(users);
                return true
            }

            return false
        },

        saveUser(users) {
            localStorage.removeItem('auth_users');
            if (users.length) { 
                localStorage.setItem('auth_users', JSON.stringify(users));
            }
            this.users = users;
        },

        getUser(user) {
            // verifica se o usuário existe no localstorage
            user = this.getVueObject(user)
            var user_found = false
            var users = this.getUsers() ? this.getUsers() : []

            users.forEach((obj,index) => {
                if (user.username == obj.username) {
                    user_found = {obj:obj,index:index};
                }
            });

            return (user_found) ? user_found : false
        },

        getUsers() {
            // retorna todos os usuarios do localstorage
            if (localStorage.getItem('auth_users') == null || localStorage.getItem('auth_users') == undefined) {
                return null;
            }

            return JSON.parse(localStorage.getItem('auth_users'));
        },

        getVueObject(object) {
            return JSON.parse(JSON.stringify(object))
        }


    },

    computed: {

    },

    mounted() {
        this.focus('username')

        if (this.getUsers() != null) {
            this.users = this.getUsers()
        }

        if(!window.localStorage) {
            // se o navegador não suportar localStorage desabilita o 'lembrar - me'
            $("#remember").attr("disabled", "true")
        }

        $(".form-control-select2").select2();
    }
})