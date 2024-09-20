export default function Scene() {
  const style = {
    width: '100%',
    height: '100%',
    background: `url('/temp/scene/world.png')`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    filter: 'grayscale(60%)'
  }
  return <div id="scene" style={style}></div>
}
