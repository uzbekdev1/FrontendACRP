import {Proyecto} from "../proyectos/proyectos.model";
import {Publicacion} from "../publicaciones/publicaciones.model";
import {Boletin} from "../boletines/boletines.model";
import {Mensaje} from "../../theme/components/messages/mensaje.model";

export class Member{
  id: number;
  usuario: User;
  activo: boolean;
  cargo: string;
  centro: any;
  categoria: string;
  resumenCV: string;
  foto: string;
  proyectos: Proyecto[];
  publicaciones: Publicacion[];
  boletines: Boletin[];
  mensajes: Mensaje[];
  rol: string;
}

export class User {
  id: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: Date;
  miembro: Member;
}
