<template>
   <div>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Listar" active>
        <b-card-text>
          <Table :data="texto" />
        </b-card-text>
      </b-tab>
      <b-tab title="Crear">

        <b-card-text> <Crear /></b-card-text>
      </b-tab>
      <b-tab title="Eliminar">
        <b-card-text> <Eliminar /></b-card-text>

      </b-tab>
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import Table from './Table.vue';
import Crear from './Crear.vue';
import Eliminar from './Eliminar.vue';
export default {
    name:"Menu",
    components:{
      Table,
      Crear,
      Eliminar
    },
    data(){
        return{
            texto:"",
            prueba:"aqui"
        }
    },
    mounted: function(){
        this._AjaxRequest.$RequestAPI("listarOrcid",{
                },
                (response) => {                    
                    console.log( response)
                    this.texto = response.Orcid.data;
            });  
    }
}
</script>

<style>

</style>