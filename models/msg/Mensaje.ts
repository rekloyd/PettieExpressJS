class Mensaje {
    contenidoMensaje: string;
    horaEnvio: Date;
    horaRecibido: Date;
    abierto: boolean;
  
    constructor(
      contenidoMensaje: string, 
      horaEnvio: Date, 
      horaRecibido: Date, 
      abierto: boolean
    ) {
      this.contenidoMensaje = contenidoMensaje;
      this.horaEnvio = horaEnvio;
      this.horaRecibido = horaRecibido;
      this.abierto = abierto;
    }
  }
  
  export { Mensaje };
  