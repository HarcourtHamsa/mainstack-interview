import { HttpStatus } from "../types/http";

export class HttpException extends Error {
  constructor(public status: HttpStatus, message: string) {
    super(message);
  }
}
