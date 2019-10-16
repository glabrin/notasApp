import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.page.html',
  styleUrls: ['./example-modal.page.scss'],
})
export class ExampleModalPage implements OnInit {
  
  modalTitle:string;
  modelId:number;

  fecha;
  hora;
  descripcion;
  titulo;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private TareasService: TareasService
  ) { }
  
  public cargar(){
    
    this.TareasService.cargarDatosPrueba(this.titulo, this.descripcion, this.fecha, this.hora);

  }
  
  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}


