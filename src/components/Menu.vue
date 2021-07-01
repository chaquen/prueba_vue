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
        <b-card-text>  {{texto}}  </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import Table from './Table.vue';
export default {
    name:"Menu",
    components:{
      Table,
    },
    data(){
        return{
            texto:"",
            prueba:"aqui"
        }
    },
    mounted: function(){
        this._AjaxRequest.$RequestAPI("prueba_json",{
                },
                (response) => {                    
                    console.log( response)
                    this.texto = response.Orcid;
            });  
    }
}
</script>

<style>

</style>