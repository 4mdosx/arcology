import { Scene } from '../../../engine/scene'
import { useUIStore } from './uiStore'

export class UIRenderer {
  id = 'ui-renderer'
  private lastUpdateTime = 0
  private loginCount = 0
  private lastLoginCount = 0
  private renderCount = 0

  render(scene: Scene, tFrame: number) {

    this.renderCount++
    if (tFrame - this.lastUpdateTime > 1000) {
      const fps = this.renderCount - this.loginCount
      this.lastUpdateTime = tFrame
      this.loginCount = this.renderCount
      useUIStore.getState().setFPS(fps)

      const entities = scene.getEntitiesByGroup('ui')
      if (entities.length > 0) {
        const entity = entities[0]
        const count = entity['fps-count'].count
        useUIStore.getState().setLoginCount(count - this.lastLoginCount)
        this.lastLoginCount = count
      }
    }
  }
}
