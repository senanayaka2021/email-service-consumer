import {Body, Controller, Get, Post} from '@nestjs/common';
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {IEmail} from "./interfaces/email.interface";

@Controller('mail')
export class EmailController {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'emails',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'mail-consumer'
            }
        }
    })
    client: ClientKafka;

    async onModuleInit() {
        this.client.subscribeToResponseOf('send.new.email');
        this.client.subscribeToResponseOf('get.mail.list');

        await this.client.connect();
    }

    @Post('/')
    appPost(@Body() post: IEmail) {
        console.log(post)
        return this.client.send('send.new.email', post);
    }

    @Get('/')
    getList() {
        return this.client.send('get.mail.list', '');
    }
}
