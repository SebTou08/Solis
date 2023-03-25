export default interface ISolicitud {
  id?: number
  tittle?: string
  description?: string 
  sendBy?: sendBy
  date?: Date
}

interface sendBy {
    name: string
    code: string
}