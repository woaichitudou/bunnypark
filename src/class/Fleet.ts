import { Web3Provider } from '@ethersproject/providers'

import sendCard from '@/utils/sendCard'
import { setContractApprove } from '@/utils/approve'
import {
  getBunnyFleetNFTContract
} from '@/config/adventure/contractHelpers'
import { getBunnyVentureAddress } from '@/config/adventure/addressHelpers'

class Fleet {
  /**
   * 送卡
   * @param library
   * @param account
   * @param to
   * @param tokenId
   */
  sendFleetCard = async (library: Web3Provider, account: string, to: string, tokenId: string) => {
    const address = getBunnyVentureAddress()
    const contract = getBunnyFleetNFTContract(library.getSigner(account))

    const isApproved = await setContractApprove(contract, library, account, address)

    if (!isApproved) return null

    const response = await sendCard({ contract, account, to, id: tokenId })
    return response
  }
}

export default new Fleet()
