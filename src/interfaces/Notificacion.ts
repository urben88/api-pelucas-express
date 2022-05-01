export interface Notificacion {
    id?:        number;
    tipo:      string;
    header:    string;
    mensaje:   string;
    createdAt?: Date;
    updatedAt?: Date;
    user_id:   number;
}
