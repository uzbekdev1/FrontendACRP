import {Member} from "../users/user.model";

export class Boletin{
  id: number;
  titulo: string;
  categoria: string;
  pdf: string;
  descripcion: string;
  fecha: Date;
  autores: Member[];
}