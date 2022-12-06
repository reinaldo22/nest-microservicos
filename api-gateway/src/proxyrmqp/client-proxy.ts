import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class ClientProxySmartRanking {
    
    getClientProxyAdminBackendInstance(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBIT_CONECCION],
                queue: 'admin-backend'
            }
        })
    }
}