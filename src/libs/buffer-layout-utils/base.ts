import { Layout } from '@solana/buffer-layout'

export interface EncodeDecode<T> {
  decode(buffer: Buffer, offset?: number): T
  encode(src: T, buffer: Buffer, offset?: number): number
}

export const encodeDecode = <T>(layout: Layout<T>): EncodeDecode<T> => {
  const decode = layout.decode.bind(layout)
  const encode = layout.encode.bind(layout)
  return { decode, encode }
}
