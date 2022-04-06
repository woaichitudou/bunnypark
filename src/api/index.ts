import { get } from '@/utils/request'

export const getEpochAssetPrice = async (params: any) => {
  const apiData: any = await get('epoch/assetPrice', params)

  return apiData
}
export const fetchHomeData = async () => {
  const apiData: any = await get('XDogeSummary')
  return apiData
}
