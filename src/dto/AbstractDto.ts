export abstract class AbstractDto {
  constructor(input: unknown) {
    Object.assign(this, input);
  }
}
