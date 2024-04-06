import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'mongoose';

@ValidatorConstraint({ name: 'IsUnique', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private connection: Connection) {}

  async validate(value: any, args: ValidationArguments) {
    const [schema] = args.constraints;
    const result = await this.connection.models[schema].findOne({
      [args.property]: value,
    });

    return !result;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const [schema] = validationArguments.constraints;

    return `'${validationArguments.value}' has already been taken in ${schema}`;
  }
}

// @Injectable()
// export function IsUnique(
//   schema: string,
//   validationOptions?: ValidationOptions,
// ) {
//   const message =
//     validationOptions?.message ??
//     `'$value' has already been taken in ${schema}`;

//   return (object: any, propertyName: string) => {
//     registerDecorator({
//       target: object.constructor,
//       propertyName,
//       options: { ...validationOptions, message },
//       constraints: [schema],
//       validator: IsUniqueConstraint,
//     });
//   };
// }

// @ValidatorConstraint({ name: 'IsUnique' })
// export class IsUniqueConstraint implements ValidatorConstraintInterface {
//   constructor(@InjectConnection() private connection: Connection) {}

//   validate(value: any, args: ValidationArguments) {
//     // console.log(args.property);
//     // console.log(args.constraints);

//     const schema = args.constraints[0];
//     console.log(this.connection.models);

//     // const result = this.connection.models[schema].findOne({
//     //   [args.property]: value,
//     // });

//     // console.log(result);

//     return false;
//     const [relatedPropertyName] = args.constraints;
//     const relatedValue = (args.object as any)[relatedPropertyName];
//     return value === relatedValue;
//   }
// }
