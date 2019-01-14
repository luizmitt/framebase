 /**
  * Componente <alertbox />
  * 
  * Mostra o alerta do bootstrap quando requisitado
  * 
  * props: alertConfig Object - É preciso passar o objeto das configurações do componentes de login, o obj 'auth'
  */
 const alertbox = Vue.component('alertbox', {
    name: 'alertbox',
    props: {
        alertConfig: Object,
        alertMessage: String,
        alertType: String
    },

    template: `<div v-show="message" v-bind:class="type" role="alert">
                    <button type="button" class="close" aria-label="Close" v-on:click="alertConfig.alertbox.message=null"><span aria-hidden="true">&times;</span></button>
                    <span v-html="message"></span>
                </div>`,
    data() {
        return {
            message:this.alertConfig.alertbox.message ? this.alertConfig.alertbox.message : this.alertMessage,
            type:'alert alert-info alert-dismissible alert-' + this.alertConfig.alertbox.type ? this.alertConfig.alertbox.type : this.alertType
        }
    },

    watch: {
        'alertConfig.alertbox.message': function (message) {
            this.message = message
        },

        'alertConfig.alertbox.type': function (type) {
            this.type = 'alert alert-info alert-dismissible alert-' + type
        },

        'alertMessage': function (message) {
            this.message = message
        },

        'alertType': function (type) {
            this.type = type
        }
    }    
})