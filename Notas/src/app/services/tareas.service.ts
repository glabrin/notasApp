import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  lista = [];
  database: SQLiteObject;
  constructor(private platform:Platform, private sqlite: SQLite) {
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'notas.db',
        location: 'default'
      })
      .then((db:SQLiteObject)=>{
        this.database = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS notas(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(50), descripcion VARCHAR(180), fecha INTEGER DATE, hora INTEGER DATETIME )', []);
        this.mostrarDatos();
      })

    });
   }

   public cargarDatosPrueba(titulo, descripcion,fecha,hora){
    let insertar = "INSERT INTO notas(titulo, descripcion, fecha, hora) VALUES (?,?,?,?)";
    let values = [titulo,descripcion,fecha,hora];
    return this.database.executeSql(insertar,values).then(response => {
      this.mostrarDatos();
    }).catch(e => alert(JSON.stringify(e)));
  }

  public mostrarDatos(){  
    let sqlSelect = 'SELECT * FROM notas';
    return this.database.executeSql(sqlSelect,[]).then( response => {      
      if (response.rows.length > 0) {
        for (var i = 0; i < response.rows.length; i++) {

          this.lista.push([response.rows.item(i)['id'],response.rows.item(i)['titulo'],response.rows.item(i)['descripcion'],response.rows.item(i)['fecha'],response.rows.item(i)['hora']]);
          
        }
      }
      alert(this.lista);
    })
  }

  public deleteAll(){
    let sqlDelete =  'delete from notas';
    this.lista = [];
    return this.database.executeSql(sqlDelete,[]).then(response => {
      alert("borro todo");
    }).catch(e => alert(JSON.stringify(e)));
    
  }

  public deleteThis(indice, id){
    this.lista.splice(indice,1);
    let sqlText = 'delete from notas where id = ? ';
    let values = [id];
    return this.database.executeSql(sqlText,values);
  }

   

  
}
