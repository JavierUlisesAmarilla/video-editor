import {AnimationAction} from "three"

export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    }
}

export interface IAnimationActionMap {
    [key: string]: AnimationAction
}

export interface IAnimationMixerEvent {
    action: AnimationAction
    loopDelta: number
}

export interface IPage {
    id?: number
    background?: string
}

export interface IPageObject {
    id?: number
    page_id: number
    type: string
    url: string
    px?: number
    py?: number
    pz?: number
    rx?: number
    ry?: number
    rz?: number
    sx?: number
    sy?: number
    sz?: number
    ox?: number
    oy?: number
    oz?: number
}

export interface ITextInfo {
    text?: string
    color?: string
    fontFamily?: string
    fontWeight?: number
    fontSize?: number
    lineHeight?: number
    letterSpacing?: number
    textDecorationThickness?: number
    textAlign?: string
}
