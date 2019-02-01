import { IEaseError } from '..';

export class EaseError extends Error implements IEaseError {
  public name: string;

  public message: string;

  public stack: string;

  constructor (name: string, message: string) {
    super(message);

    this.name = name;
  }
}
