interface MaterialSymbolsProps {
  name?: string,
  raw?: string,
  style?: React.CSSProperties,
}

const symbolMap = {
  home: '&#xE8B6;',
  explore: '&#xe87a;',
}

export default function MaterialSymbols(props: MaterialSymbolsProps) {
  const name = props.name || ''
  // @ts-ignore
  const symbol = props.raw || symbolMap[name]
  return <span className="material_symbols" style={props.style} dangerouslySetInnerHTML={{ __html: symbol }}></span>
}
