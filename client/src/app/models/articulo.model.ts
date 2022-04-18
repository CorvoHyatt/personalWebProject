export class Articulo {
    idArticulo: number
    tipCLR: string
    titulo: string
    nombreCLR: string
    estado: string
    fechaEdicion: string
    tipoNI: string
    issnisbn: string
    volumen: string
    paginas: string
    anyo: string
    doi: string
    comprobante: string
    indexa: string
    issue: string
    editores: string
    cuidad: string
    pais: string
    editorial: string

    constructor() {
        this.idArticulo = 0;
        this.tipCLR = "Revista"
        this.titulo = "Programación 2"
        this.nombreCLR = "Revista Computacion"
        this.estado = "Publicado"
        this.fechaEdicion = "2022-01-25"
        this.tipoNI = "nacional"
        this.issnisbn = "Abc001"
        this.volumen = "3"
        this.paginas = "5-8"
        this.anyo = "2022"
        this.doi = "http://programacion.com"
        this.comprobante = ""
        this.indexa = "1"
        this.issue = ""
        this.editores = "Tres hermanos"
        this.cuidad = "Oaxaca"
        this.pais = "Mexico"
        this.editorial = "Patito"
    }


}