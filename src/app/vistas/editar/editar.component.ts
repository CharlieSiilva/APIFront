import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ListarecibosI } from '../../modelos/listaRecibos.interface';
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private activatedroute:ActivatedRoute, private router:Router, private api:ApiService) { }

  fechaHoy:Date = new Date();

  datosRecibo:ListarecibosI;
  editarForm = new FormGroup({
    idRecibo: new FormControl(""),
    idUsuario: new FormControl(""),
    proveedor: new FormControl(""),
    monto: new FormControl(""),
    moneda: new FormControl(""),
    comentario: new FormControl(""),
    fechaComentario: new FormControl("")
  });

  ngOnInit():void {
    let reciboId = this.activatedroute.snapshot.paramMap.get("id");
    console.log(reciboId);
    let user = this.getUserId();
    console.log(user);
    this.api.getReceiptById(reciboId).subscribe(data =>{
      console.log(data)
      this.datosRecibo = data;
      this.editarForm.setValue({
        "idRecibo": this.datosRecibo.idRecibo,
        "idUsuario": this.datosRecibo.idUsuario,
        "proveedor": this.datosRecibo.proveedor,
        "monto": this.datosRecibo.monto,
        "moneda": this.datosRecibo.moneda,
        "comentario": this.datosRecibo.comentario,
        "fechaComentario": this.fechaHoy
      });
      console.log(this.editarForm.value);
    });
  }

  getUserId(){
    return localStorage.getItem("IdUsuario");
  }

  postForm(form:ListarecibosI){
    this.api.putRecibo(form).subscribe(data =>{
      console.log(data)
    });
    console.log(form);
  }

  eliminar(){
    let datos:ListarecibosI = this.editarForm.value;
    this.api.deleteRecibo(datos).subscribe(data =>{
      console.log(data)
    })
  }

  salir(){
    this.router.navigate(["dashboard"]);
  }

}
