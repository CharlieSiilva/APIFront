import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ListarecibosI } from '../../modelos/listaRecibos.interface';
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  fechaHoy:Date = new Date();
  nuevoForm = new FormGroup({
    idUsuario: new FormControl(parseInt(localStorage.getItem("IdUsuario"))),
    proveedor: new FormControl(""),
    monto: new FormControl(""),
    moneda: new FormControl(""),
    comentario: new FormControl(""),
    fechaComentario: new FormControl(this.fechaHoy)
  });

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit() {
  }

  postForm(form:ListarecibosI){
    console.log(form);
    this.api.postRecibo(form).subscribe(data =>{
      console.log(data);
    })

  }

  salir(){
    this.router.navigate(["dashboard"]);
  }

}
