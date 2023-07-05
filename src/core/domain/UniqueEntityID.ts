import crypto from 'node:crypto';
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<string | number>{
  constructor(id?: string | number) {
    super(id ? id : crypto.randomUUID())
  }
}