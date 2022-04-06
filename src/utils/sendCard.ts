import { Contract } from '@ethersproject/contracts'

/**
 * 送卡
 * @param library
 * @param account
 * @param to 送卡目标地址
 * @param id 卡片id
 */

interface SendCardParams {
  contract: Contract
  account: string
  to: string
  id: string
}

const sendCard = async ({ contract, account, to, id }: SendCardParams): Promise<string | null> => {
  try {
    const tx = await contract.transferFrom(account, to, id)
    const receipt = await tx.wait()

    if (receipt.status) {
      const { transactionHash } = receipt

      return transactionHash
    }
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}

export default sendCard
