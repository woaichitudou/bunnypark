import SVGA from 'svgaplayerweb'

type PropsChild<P> = P
type encypt<P = {}> = (props: PropsChild<P>) => any
interface Props {
  elem: string
  fileUrl: any
  loop?: number
  auto?: boolean
}

const LoadSvga = (Parser: any, fileUrl: string) => {
  return new Promise(resolve => {
    Parser.load(fileUrl, (videoItem: string) => {
      resolve(videoItem)
    })
  })
}

const setSvga: encypt<Props> = async ({ elem, fileUrl, loop = 0, auto = true }) => {
  const Parser = new SVGA.Parser()
  const videoItem = await LoadSvga(Parser, fileUrl)
  const Player = new SVGA.Player(elem)
  Player.clearsAfterStop = false
  if (elem && (Player as any)._container) {
    Player.setVideoItem(videoItem as any)
    Player.loops = loop
    if (auto) {
      Player?.startAnimation()
    }
  }
  return Player
}

export default setSvga
