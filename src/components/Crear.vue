<template>
<div class="container">
    <div class="row justify-content-md-center">
        <p class="col-6">Ingrese el ORCID que quiere crear</p>
        <br>
    </div>
    <div class="row justify-content-md-center">
        <b-form class="col-6">
            <b-form-group>
                <b-form-input type="text" v-model="text" placeholder="Ingrese el orcid"></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button variant="info" v-on:click="crearOrcid()">Crear Orcid</b-button>
            </b-form-group>
        </b-form>
    </div>
    <div class="container">
        <div class="row col-12 justify-content-md-center">
            <b-alert show variant="primary">{{ frase }}</b-alert>
            <b-alert show variant="danger">{{mensaje_error}}</b-alert>
        </div>
        <div class="row col-12 justify-content-md-center">
            <b-alert show variant="primary">{{ names }} {{ lastNames }}</b-alert>
        </div>
        
    </div>
</div>
</template>

<script>

export default {
    'name':'Crear',
    data() {
        return {
            text: null,
            mensaje_error: null,
            frase: null,
            names: null,
            lastNames: null
        }
    },
    methods: {
        crearOrcid: function () {
           this._AjaxRequest.$RequestAPI("crearOrcid",{
                    'orcid':this.text
                },
                (response) => {                    
                    console.log( response)
                  this.mensaje_error = response.ResponseMessage,  
                  this.frase = response.MessageResponse,
                  this.names = response.Orcid[0].names,
                  this.lastNames = response.Orcid[0].last_names
            }); 
        }
    }
}
</script>