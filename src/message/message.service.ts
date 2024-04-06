import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import amqp, { Channel, ChannelWrapper } from 'amqp-connection-manager';
import { rabbitMQConstant } from 'src/app/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class MessageService {
  private channelWrapper: ChannelWrapper;

  constructor(
    @InjectModel(Message.name)
    private readonly messageSchema: Model<Message>,
    @InjectModel(User.name)
    private readonly userSchema: Model<User>,
  ) {
    const connection = amqp.connect([rabbitMQConstant.url]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(rabbitMQConstant.queue, { durable: false });
      },
    });
  }

  async sendMessage(data: MessageDto, userId: string): Promise<Message[]> {
    console.log('Sending message:', data.content);

    // create data in database
    const fromUser = await this.userSchema.findById(userId);
    const users = await this.userSchema.find({
      _id: { $ne: userId },
    });
    const result = [];
    for (const user of users) {
      await this.messageSchema.create({
        to: user.id,
        from: userId,
        content: data.content,
      });

      result.push({
        from: fromUser,
        to: user,
        content: data.content,
      });
    }

    // send message to queue
    await this.channelWrapper.sendToQueue(
      rabbitMQConstant.queue,
      Buffer.from(data.content),
    );

    return result;
  }

  async viewMessage(userId: string): Promise<Message[]> {
    const messages = await this.messageSchema
      .find({ from: userId })
      .populate(['from', 'to']);
    return messages;
  }
}
