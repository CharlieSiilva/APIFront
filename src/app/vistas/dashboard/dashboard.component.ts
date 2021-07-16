import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { ListarecibosI } from '../../modelos/listaRecibos.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) { }

  recibos:ListarecibosI[];

  ngOnInit() {
    let usr = parseInt(localStorage.getItem("IdUsuario"));
    this.api.getReceipts(usr).subscribe(data =>{
      this.recibos = data;
      console.log(data)
    })
  }

  editarRecibo(id){
    this.router.navigate(["editar", id]);
    console.log(id)
  }

  nuevoPaciente(){
    this.router.navigate(["nuevo"]);
  }

}
