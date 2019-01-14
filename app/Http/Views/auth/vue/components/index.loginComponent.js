/**
 * Autenticador PMM escrito em VueJS 2
 * 
 * Autenticador dividido em passos, similar ao do gmail, para melhorar a segurança de acesso ao sistemas pmm de todos os sistemas.
 * author: Luiz Schmitt <lzschmitt@gmail.com>
 */

/**
 * Componente <login />
 * 
 * É o componente onde determinara se o usuário terá acesso ou não a um sistema.
 * 
 */
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
                email_joker:'',
                email_confirm:'',
                cpf: '',
                login:'',
                picture:'',
                username:'',
                password:'',
                environment:'dev',
                remember:false
            },

            users: []
        }
    },

    methods: {
        next() {
            if (this.user.username.length) {
                // axios - pegar dados do usuario e atualiza o this.user
                axios.post(url + 'auth/getUserData', {
                    account:this.user.username
                })
                .then(response => {
                    if(response.data.return) {
                        const data = response.data.data

                        this.user.name        = data.TX_NOME
                        this.user.email       = data.TX_EMAIL_PMM
                        this.user.login       = data.TX_LOGIN
                        this.user.cpf         = data.NB_CPF
                        this.user.picture     = data.BL_FOTO
                        this.user.email_joker = data.TX_EMAIL_PMM ? data.TX_EMAIL_PMM.email_joker() : null
                    
                        if (this.user.remember) {
                            this.addUser(this.user)
                        }
                        
                        this.auth.alertbox.message=null
                        this.auth.step = 2
                        this.focus('password')
                    } else {
                        this.alertbox("A conta informada <strong>" + this.user.username + "</strong> não está associada a nenhum usuário pmm.", "danger")
                    }
                })
                .catch(error => {
                    this.alertbox("<strong>Oops! Ocorreu um Erro Interno:</strong> O serviço está temporariamente indisponível, tente novamente em alguns minutos, se o problema persistir entre em contato com o suporte.", "danger")
                    console.log(error)
                })
            } else {
                this.alertbox("<strong>Atenção!</strong> É necessário informar uma conta de acesso para prosseguir.", "warning")
                this.focus('username')
            }
        },
        
        enter() {
            // axios - loga o this.user
        },

        send() {
            if (this.user.email === this.user.email_confirm) {
                // axios - envia um e-mail com o link de recuperacao do this.user. *Necessário acertar o e-mail coringa
                this.auth.alertbox.message=null
                this.alertbox("<strong>Sucesso!</strong> Você receberá em alguns instantes um e-mail com um link de acesso para resetar a sua senha.", "success")
            }
            else if (!this.user.email_confirm.length) {
                this.alertbox("<strong>Atenção!</strong> É necessário confirmar o e-mail vinculado a sua conta", "warning")
                this.focus("email_confirm")
                return false;
            }
            else {
                this.alertbox("<strong>Oops! Ocorreu um Erro:</strong> O e-mail informado está diferente do cadastrado. verifique se foi digitado corretamente ou entre em contato com seu suporte.", "danger")
                return false;
            }
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
            if (this.user.email == null) {
                this.alertbox("<strong>Oops! Ocorreu um Erro:</strong> Você não possui um e-mail vinculado a sua conta, por favor, entre em contato com o seu suporte parar efetuar o cadastro.", "danger")
                return false;
            }
            this.auth.step = 4
            this.focus('email_confirm')
        },

        cancel(step = 1) {
            this.auth.alertbox.message = null
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
            this.user.name = ''
            this.user.email = ''
            this.user.email_joker = ''
            this.user.email_confirm = ''
            this.user.cpf   = ''
            this.user.login = ''
            this.user.picture = ''
            this.user.username = ''
            this.user.password = ''
            this.user.environment = 'dev'
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
                email_joker:'',
                email_confirm:'',
                cpf: '',
                login:'',
                picture:'',
                username:'',
                password:'',
                environment:'dev',
                remember:false
            }
        },

        selectUser(user) {
            user = this.getVueObject(user)
            this.user = user
            this.auth.step = 2
            this.focus('password')
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
                localStorage.setItem('auth_users', JSON.stringify(users).crypt())
            } else {
                if (this.auth.step == 3) {
                    this.auth.step = 1
                    this.auth.alertbox.message=null
                    this.resetUser()
                }
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
            if (!window.localStorage && localStorage.getItem('auth_users') == null || localStorage.getItem('auth_users') == undefined) {
                return false;
            }

            return JSON.parse(localStorage.getItem('auth_users').decrypt());
        },

        getVueObject(object) {
            // converte vue objeto para um objeto comum
            return JSON.parse(JSON.stringify(object))
        }


    },

    computed: {

    },

    watch: {

    },

    mounted() {
        // se houver dados no localStorage
        if (this.getUsers()) {
            // atualiza os dados reativamente
            this.users = this.getUsers()

            // se tiver mais de um usuario
            if (this.users.length > 1) {
                // abre a pagina de selecao de usuario 'Quem é você?'
                this.auth.step = 3
                // se for apenas um usuário
            } else if (this.users.length == 1) {
                // abre a pagina de senha
                this.auth.step = 2
                // atualiza este usuario reativamente
                this.user = this.users[0]
                // mostra a senha
                this.focus('password')
            }
        } else {
            // se não houver nenhum dados no localStorage
            // abre na pagina padrao, step=1, e foca no campo de conta
            this.focus('username')
            
            // se o navegador não suportar localStorage, desabilita o 'lembrar-me'
            if(!window.localStorage) {
                this.$refs.remember.disabled=true
            }
        }

        $(".form-control-select2").select2();
    }
})