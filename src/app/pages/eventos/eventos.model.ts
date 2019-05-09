import {Centro} from "../centros/centros.model";

export class Evento {
    id: number;
    nombre: string;
    categoria: string;
    pdf: string;
    descripcion: string;
    direccion: string;
    centro: Centro;
    fecha: Date;
}