import { Injectable, OnModuleInit } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { rabbitMQConstant } from 'src/app/constants';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;

  constructor() {
    const connection = amqp.connect([rabbitMQConstant.url]);
    this.channelWrapper = connection.createChannel();
  }

  async onModuleInit() {
    await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
      await channel.assertQueue(rabbitMQConstant.queue, { durable: false });
      await channel.consume(rabbitMQConstant.queue, (message) => {
        console.log('Received message:', message.content.toString());

        if (message) {
          channel.ack(message);
        }
      });
    });
  }
}
