import { Petter } from "../Pettier";
import { Mensaje } from "./Mensaje";
import { Owner } from "../Owner";

class Chat {
    usuarioE: Owner;
    usuarioC: Petter;
    mensajesChat: Mensaje[];
  
    constructor(usuarioE: Owner, usuarioC: Petter, mensajesChat: Mensaje[] = []) {
      this.usuarioE = usuarioE;
      this.usuarioC = usuarioC;
      this.mensajesChat = mensajesChat;
    }
  
    // Agregar un mensaje al chat
    agregarMensaje(mensaje: Mensaje): void {
      this.mensajesChat.push(mensaje);
    }
  
  
    // Eliminar todos los mensajes del chat
    eliminarTodosLosMensajes(): void {
      this.mensajesChat = [];
    }
  }
  
  export { Chat };
  
