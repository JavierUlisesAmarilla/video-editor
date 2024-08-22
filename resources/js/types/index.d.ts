export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
}

export interface Page {
    id?: number
    background?: string
}

export interface PageObject {
    id?: number
    page_id?: number
    type?: string
    url?: string
    px?: number
    py?: number
    pz?: number
    rx?: number
    ry?: number
    rz?: number
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    }
}
