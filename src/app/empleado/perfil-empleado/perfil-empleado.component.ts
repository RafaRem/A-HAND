import { Component, OnInit } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import '@firebase/firestore';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit {
  profiles;
  db;
  curri = [];
  cont = 0;
  curp;
  auth; 
  correo: any;
  file;
  imagen = 'https://image.freepik.com/vector-gratis/feliz-hombre-negocios_1133-457.jpg';
storage;
  datos = {
    nombre: '',
    app: '',
    apm: '',
    edad: 0,
    titulo: '',
    gestudio: '',
    uni: ''
  };
  constructor() {  
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.storage = FribaseinicializarService.storage.ref();
    this.perfil(localStorage.getItem('correo'));
    this.correo =localStorage.getItem('correo');
    const self = this;
    this.selectOne('documento', 'correo', self.correo, function(snap) {
      self.imagen = snap.URL;
      console.log(snap);
    } );
    this.init();
  }

  init() {
   
    const self = this;
    this.db.collection('empleado').doc(this.correo)
    .onSnapshot(function(querySnapshot) {
      const info = querySnapshot.data();
     
      self.datos.nombre = info.nombre;
      self.datos.app = info.app;
      self.datos.apm = info.apm;
      self.datos.edad = info.edad;
      self.datos.titulo = info.titulo;
      self.datos.gestudio = info.gestudio;
      self.datos.uni  = info.uni;
     
    });
   }

  ngOnInit() { 
    
    //this.curriculum(this.curp.curp);
  }
  
  modificar(){
  this.db.collection('empleado').doc(this.correo).set(this.datos, { merge: true })
    alert("datos actualizados")
    }

  perfil(correo) {
    console.log(correo)
    const query = this.db.collection('empleado').doc(correo); 
     query.get().then(querySnap => {
          this.profiles = querySnap.data();
          console.log(this.profiles);
          this.curriculum(this.profiles.curp);
      
    });
  }
  curriculum(curp){
    const query = this.db.collection('curriculum').doc(curp).collection('curriculum'); 
     query.get().then(querySnap => {
      querySnap.forEach(element => {
     
        this.curri[this.cont] = element.data();
        //console.log(element.data());
        console.log(this.curri[this.cont]);
        this.cont = this.cont + 1;
  
    });
    });
  
  }
  selectOne(coleccion: string, condicion: string, valorcondicion, entonces) {
    this.db.collection(coleccion)
    .where(condicion, '==', valorcondicion)
    .limit(1)
    .get()
    .then(
      (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docu = doc.data();
            docu.id = doc.id;
            entonces(docu);
          }
        );
      }
    );
  }
  SelectFile(event) {
    this.file = <File>event.target.files[0];
    const correo = this.correo;
    const storageref = this.storage;
    const metadata = {
      contentType: this.file.type
    };
    const self = this;
  
    storageref.child(self.correo+"/"+self.file.name)
    .put(self.file, metadata)
    .then(function(snap) {
      const documento = {
        URL: snap.downloadURL,
        correo: self.correo,
        nombre: self.file.name
      };
      self.imagen = documento.URL;
      
      self.insert('documento', documento,
          function(res) {  },
          function(res) { console.log(res); });
    });
  }


  insert(coleccion: string, objeto: any, entonces, cachar) {
    this.db.collection(coleccion).doc(this.correo).set(objeto)
      .then(function(docRef) {
        alert("imagen cambiada correctamente")
          console.log('Document written with ID: ', docRef.id);
          entonces(docRef);
          
        }
      )
      .catch(function(error) {
          console.error('Error adding document: ', error);
          cachar(error);
        }
      );
  }
}
