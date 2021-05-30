/** @format */

export class User {
  userName: string
  email: string
  birthDate: any
  address: string | null

  private id: string | null

  constructor(userName: string, email: string,  address: string | null = null, birthDate: any = null, id: string | null = null) {
    this.id = id
    this.email = email
    this.userName = userName
    this.birthDate = birthDate
    this.address = address
  }
}
