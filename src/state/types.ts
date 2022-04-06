export interface BlockState {
  currentBlock: number
  initialBlock: number
}

export interface ShareMessageState {
  shareMessage: string
}

export interface FleetMember {
  position: number
  tokenId: number
  type: string
  kind: number
  power: number
  level: number
}

export interface FleetMemberState {
  data: FleetMember[]
}

export interface Pilot {
  tokenId: number | undefined
  status: boolean
  type: string
  buff: number
  name: string
}

export interface PilotState {
  data: Pilot
}

export interface State {
  block: BlockState
  shareMessage: ShareMessageState
  fleetMember: FleetMemberState
  pilot: PilotState
}
