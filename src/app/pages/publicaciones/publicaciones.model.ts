import {Member} from "../users/user.model";

export class Publicacion {
    id: number;
    titulo: string;
    categoria: string;
    pdf: string;
    fecha: Date;
    descripcion: string;
    autores: Member[];
}