export interface Course {
    id: string
    name: string
    credit: number
    description?: string
    prereqs?: string[]
    ubreadth?: string
}