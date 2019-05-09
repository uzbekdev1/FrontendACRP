import {Member} from "../users/user.model";

export class Proyecto{
  id: number;
  titulo: string;
  categoria: string;
  pdf: string;
  descripcion: string;
  autores: Member[];
}