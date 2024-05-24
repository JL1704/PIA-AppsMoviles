import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular'; 
import { MetodoPagoService } from '../metodo-pago.service'; 

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.scss'],
})
export class MetodoPagoComponent implements OnInit {

  metodoPagoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private metodoPagoService: MetodoPagoService // Inyecta el servicio MetodoPagoService
  ) {
    this.metodoPagoForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]],
      expirationDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.metodoPagoForm.valid) {
      // Enviar los datos del formulario al servicio MetodoPagoService
      this.metodoPagoService.enviarMetodoPago(this.metodoPagoForm.value)
        .then(() => {
          console.log('Datos del método de pago enviados correctamente.');
          // Cierra el modal al enviar el formulario
          this.dismissModal();
        })
        .catch(error => {
          console.error('Error al enviar los datos del método de pago:', error);
          // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        });
    } else {
      console.error('El formulario no es válido. Por favor, complete todos los campos correctamente.');
      // Manejar el caso donde el formulario no es válido, por ejemplo, mostrar un mensaje al usuario
    }
  }

  // Método para cerrar el modal
  dismissModal() {
    this.modalController.dismiss();
  }
}
