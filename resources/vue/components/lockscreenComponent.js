const lockscreen = Vue.component('lockscreen', {
    name: 'lockscreen',
    props: {
        propActivated: Boolean
    },
    template: `<section class="lockscreen" v-show="activated">
                    <div class="col-12 lockscreen-header"></div>

                    <div class="">
                        <div class="hidden-xs col-md-4"></div>
                        <div class="col-xs-12 col-md-4 col-lg-4 lockscreen-container">
                            <div class="row">
                                <div class="col-xs-6 col-md-6">
                                    <img class="img-responsive left lockscreen-logo" src="">
                                </div>

                                <div class="col-xs-6 col-md-6">
                                    <img class="img-responsive right lockscreen-logo" src="">
                                </div>
                            </div>
                            <div class="container">
                                <form autocomplete="false">
                                    <div id="step2" class="container">
                                        <div class="row">
                                            <div class="col-12 text-left">
                                                <h3></h3>
                                                <div class="container lockscreen-user-data text-left">
                                                    <i class="fa fa-user lockscreen-user-no-picture"></i>
                                                    <label></label>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        
                                        <div class="row">
                                            <label class="label-control"></label>
                                            <input class="form-control" type="password" id="password" name="password" ref="password" >
                                        </div>
                          

                                        <div class="row">
                                            <ul class="lockscreen-list">
                                                <li><a href="#" ></a></li>
                                                <li><a href="#" ></a></li>
                                                <li><a href="#" ></a></li>
                                            </ul>
                                        </div>

                                        <div class="row text-right">
                                            <button type="button" class="btn btn-primary" >
                                                <i class="fa fa-sign-in"></i>
                                                
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="hidden-xs col-md-4"></div>
                    </div>                    
              </section>`,
    data() {
        return {
            activated: false
        }
    },

    watch: {
        propActivated: function (mode) {
            this.activated = mode
        }
    },

    mounted() {

    }
})