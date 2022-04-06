// 卡分类
export const cardsMatch: Record<string, any> = {
  N: 'Basic',
  R: 'Cream',
  SR: 'Dinosaur',
  BABY: 'Bunny'
}

// 卡分类name2
export const cardsMatchs: Record<string, String[]> = {
  N: ['Swimming', 'Tennis', 'Cycling', 'Football'],
  R: ['Cream', 'Ice', 'Forest', 'Travel'],
  SR: ['Tiger', 'Lucky Cat', 'Dinosaur', 'Shark'],
  BABY: ['BabyBunny']
}

// 卡战力值分类
export const cardPower: Record<string, any> = {
  N: 7,
  R: 14,
  SR: 20
}

// 卡属性大类
export enum BunnyCardsType {
  N,
  R,
  SR,
  BABY
}

// 冒险城市名
const _citiesName = [
  'Sydney',
  'Tokyo',
  'Dubai',
  'Berlin',
  'Los Angeles',
  'Paris',
  'Shanghai',
  'Moscow',
  'London',
  'New York'
]

export const citiesName = _citiesName.map((name) => name.toUpperCase())

// 机队规模
export enum FleetSizeName {
  'small' = 2,
  'medium-sized' = 4,
  'large' = 6,
  'super' = 8
}

// 驾驶员
export const pilotCardInfo = {
  'share-1': {
    type: 1,
    buff: 3.5,
    name: 'Warrior'
  },
  'share-2': {
    type: 2,
    buff: 1,
    name: 'Astronaut'
  }
}
