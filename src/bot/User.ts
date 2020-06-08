export class User{
    constructor(private name: string, private email: string, private fav_lang: string){ }

    public createSubscription(){
        return `Genial! ${this.name}, tu suscripcion se ha confirmado, pronto estaras recibiendo correos acerca de ${this.fav_lang} a ${this.email}`
    }
}