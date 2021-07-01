import Vue from 'vue'
import App from './App.vue'
import env from './env'
import route_list from './routes'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)



Vue.config.productionTip = false

Vue.prototype._AjaxRequest = {
  _DEBUG:env._ENV_DEBUG,
  _URL_ROOT: env._ENV_URL_ROOT,  
  _MESSAGE_RESPONSE: {
    message:"",
    code:0
  },
  _API_ROUTES:route_list,  
  _HEADERS:{
      "GET":{ 
        name:"GET",
        // Adding method type 
        method: "GET",           
        // Adding headers to the request 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
      },
      "POST":{ 
        name:"POST",
          // Adding method type 
          method: "POST",           
          // Adding headers to the request 
          headers: { 
              "Content-type": "application/json; charset=UTF-8"            
          },
          // Adding body to the request 
          body:{}
          
      },
      "POST_FILE":{ 
        name:"POST_FILE",
        // Adding method type 
        method: "POST",           
        // Adding headers to the request 
        /*headers: { 
          'Content-Type': 'multipart/form-data'
        },*/
        // Adding body to the request 
        body:{}
        
    }
  }, 
  $RequestAPI(pathname,data,callback,files) {
    console.log("PETICION RUTA "+pathname);
    let url = this._URL_ROOT;
    let route;
    let type_request;
    this._API_ROUTES.forEach(api_route => {
      if (api_route.name == pathname){
          route =  api_route.path;
          type_request =  api_route.type_request;
      }
    });    
    let header;
    this._API_ROUTES.forEach(api_route => {
      if (api_route.name == pathname){
        header =  this._HEADERS[type_request];
        if(header.name == "POST" && data != undefined)
        {
          header.body = JSON.stringify(data) 
        }    
        if(header.name == "POST_FILE" && data != undefined)
        {         
            let requestData = new FormData();          
            Object.keys(data).forEach(d => {
              requestData.append(d,JSON.stringify(data[d]));
            });
            var i=0;
          if(files.data.length > 0)
          {
            for (const file of files.data[i]) {
              requestData.append("imagenes[]",file,file.name);
              i++;
            
            }                     
          }
          header.body = requestData;
        }    
      }        
    }); 
    let endpoint = url+route;
    let headerEndpoint = this._HEADERS[type_request];
   
    
    fetch(endpoint, headerEndpoint)       
    .then(response => response.json())       
    .then(function(response) {
      callback(response);     
    }).catch(function(response){
      console.log(response);      
    })
  },
}

new Vue({
  render: h => h(App),
}).$mount('#app')
