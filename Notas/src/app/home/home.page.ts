import { Component } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import { ModalController } from '@ionic/angular';
import { ExampleModalPage } from '../example-modal/example-modal.page'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  dataReturned:any;
  constructor( public modalController: ModalController, private TareasService: TareasService) {
    
  }
  
  async openModal() {
    const modal = await this.modalController.create({
      component: ExampleModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Crear nueva nota"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        
      }
    });
    
    return await modal.present();
  }
  public Eliminar(){
    this.TareasService.deleteAll();
  }

  public EliminarUno(indice, id){
    this.TareasService.deleteThis(indice, id);
  }
  datos = this.TareasService.lista;
}
