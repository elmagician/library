export class Toast {
  message: string
  isError: boolean = false

  constructor(message: string, isError: boolean = false) {
    this.message = message
    this.isError = isError
  }
}