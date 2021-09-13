import { v4 as uuidv4 } from 'uuid';

export function AlertConstructor(text, type) {
   this.text = text;
   this.type = type;
}
