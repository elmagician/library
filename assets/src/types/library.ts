/** @format */

export class Library {
  name: string
  public: boolean
  address: string | null

  private id: string | null

  constructor(name: string, address: string | null = null, isPublic: boolean = false, id: string | null = null) {
    this.id = id
    this.name = name
    this.public  = isPublic
    this.address = address
  }
}
