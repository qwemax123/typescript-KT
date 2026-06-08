export interface SignRequest {
  name: string
}

export interface CheckRequest {
  name: string
}

export interface CreateRequest {
  firstName: string
  lastName: string
}

export interface PetRequest {
  index: number
  pet: string
}

export interface ColorsRequest {
  index: number
  colors: string[]
}