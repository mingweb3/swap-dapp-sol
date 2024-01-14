import BigNumber from 'bignumber.js'

// https://github.com/MikeMcl/bignumber.js
// https://blog.csdn.net/shenxianhui1995/article/details/103985434
export class TokenAmount {
  public wei: BigNumber

  public decimals: number
  public _decimals: BigNumber

  constructor(wei: number | string | BigNumber, decimals: number = 0, isWei = true) {
    this.decimals = decimals
    this._decimals = new BigNumber(10).exponentiatedBy(decimals)

    if (isWei) {
      this.wei = new BigNumber(wei)
    } else {
      this.wei = new BigNumber(wei).multipliedBy(this._decimals)
    }
  }

  toWei() {
    return this.wei
  }

  fixed() {
    return this.wei.dividedBy(this._decimals).toFixed(this.decimals)
  }
}
