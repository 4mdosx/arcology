interface Game {
  data: any
  character: Character
  world: World
  outpost: OutPost
}

interface Module {
  tick: () => void
}