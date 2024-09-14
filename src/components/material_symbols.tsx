import clsx from 'clsx'
interface MaterialSymbolsProps {
  name?: string,
  raw?: string,
  style?: React.CSSProperties,
  className?: string,
  fill?: boolean,
}

const symbolMap = {
  home: '&#xE8B6;',
  explore: '&#xe87a;',
  star: '&#xe838;',
}

export default function MaterialSymbols(props: MaterialSymbolsProps) {
  const name = props.name || ''
  // @ts-ignore
  const symbol = props.raw || symbolMap[name]
  const className = clsx('material_symbols', props.className, props.fill ? 'fill' : '')
  return <span className={className} style={props.style} dangerouslySetInnerHTML={{ __html: symbol }}></span>
}
