<template>
  <div>      
    <table class="table table-bordered">
    <thead v-if="data!=undefined">
        <tr>
            <th v-for="(field,index) in fields" :key="index"  colspan="1">
                {{field}}
            </th>
        </tr>      
    </thead>
    <tbody>
        <tr scope="row" v-for="(orc,index) in data" :key="index">
   
                <td  scope="col">{{orc.names}}</td>
                <td  scope="col">{{orc.last_names}}</td>
                <td  scope="col">{{orc.email}}</td>
                <td  scope="col">
                   <b-button id="show-btn" :class="index % 2 ==0 ? 'btn-success' : 'btn-info'" @click="detailOrcid(orc.orcid,index)">Ver detalles</b-button>
                  <b-modal :id='"bv-modal-"+index' hide-footer>
                    <template #modal-title>
                      Información de <code>{{orc.names}}</code> 
                    </template>
                    <div class="d-block text-center">
                      <h5><strong>Nombre:</strong>{{orc.names}}</h5>
                    </div>
                    <div class="d-block text-center">
                      <h5><strong>Apellidos:</strong>{{orc.last_names}}</h5>
                    </div>
                    <div class="d-block text-center">
                      <h5><strong>Correo:</strong>{{orc.email}}</h5>
                    </div>
                     <div class="d-block text-center">
                      <h5><strong>Descripciones:</strong></h5>
                      <ul class="list-group">
                        <li  class="list-group-item" v-for="(des,ind) in orc.descriptors" :key="ind">{{des.name}}</li>
                      </ul>
                    </div>
                    <b-button class="btn-danger"  block @click="$bvModal.hide('bv-modal-'+index)">Cerrar </b-button>
                  </b-modal>
                </td>
        </tr>     
    </tbody>
    </table>
  </div>  
</template>


<script>
  export default {
    name: 'Table',
    props:['data'],
    methods: {
      detailOrcid: function (orcid,index) {
        this._AjaxRequest.$RequestAPI("listarDetalleOrcid",{
          orcid:orcid
                },
                (response) => {                    
                    console.log( response)
                    this.$bvModal.show('bv-modal-'+index)
                    this.texto = response.Orcid.data;
        });   
      }
        
    },
   
    data() {
      return {
        
        fields: ['names','last_names','email','Ver detalle'],
                 
      }
    }
  }
</script>