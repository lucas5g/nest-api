import { Exclude, Transform } from "class-transformer"

export class ManageEntity {
  @Transform(({ value }) => value.toString())
  id: number

  name: string


  @Transform(({ value }) => value.toString())
  age: number

  @Exclude()
  password: string

  constructor(partial: Partial<ManageEntity>) {
    Object.assign(this, partial);
  }
}

