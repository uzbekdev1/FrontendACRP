import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'Home', '/home', null, 'dashboard', null, false, 0),
    new Menu (2, 'Miembros', 'miembros', null, 'supervisor_account', null, false, 0),
    new Menu (3, 'Centros', 'centros', null, 'account_balance', null, false, 0),
    new Menu (4, 'Proyectos', 'proyectos', null, 'work', null, false, 0),
    new Menu (5, 'Publicaciones', 'publicaciones', null, 'bookmarks', null, false, 0),
    new Menu (6, 'Boletines', 'boletines', null, 'book', null, false, 0),
    new Menu (7, 'Eventos', 'eventos', null, 'event', null, false, 0),
    new Menu (8, 'Noticias', 'noticias', null, 'fiber_new', null, false, 0),
]
