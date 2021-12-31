import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise((resolve, reject) => {

      this.http.get<Producto[]>('https://angular-html-d5fa6-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
        .subscribe((resp: Producto[]) => {
  
          this.productos = resp;
          this.cargando = false;
          resolve('');
          
        }
      );

    })


  }

  getProducto(id: string){

    return this.http.get(`https://angular-html-d5fa6-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);
  
  }

  buscarProducto(termino: string){

    if(this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then(()=>{
        //ejecutar despues de terner los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      })
    }else{
      //aplicar filtro
      this.filtrarProductos(termino);
    }
    
  }

  private filtrarProductos(termino: string){

    this.productosFiltrados = [];

    termino = termino.toLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo?.toLowerCase();

      if(prod.categoria!.indexOf(termino) >= 0 || tituloLower!.indexOf(termino) >= 0){

        this.productosFiltrados.push(prod);

      }

    })
    
  }

}
