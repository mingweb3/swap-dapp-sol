import * as borsh from '@project-serum/borsh'

class AirdropSchema {
  amount: number

  constructor(amount: number) {
    this.amount = amount
  }

  AIRDROP_IX_DATA_LAYOUT = borsh.struct([borsh.u8('variant'), borsh.u32('amount')])

  serialize(): Buffer {
    const payload = {
      variant: 0,
      amount: this.amount
    }

    const ixBuffer = Buffer.alloc(9)
    this.AIRDROP_IX_DATA_LAYOUT.encode(payload, ixBuffer)

    return ixBuffer
  }
}

export default AirdropSchema
