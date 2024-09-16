interface Game {
  data: any
  character: Character
  world: World
  outpost: OutPost
  mission: Mission
  meta: Meta
}

interface Module {
  tick: () => void
}

interface Issue {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
}
