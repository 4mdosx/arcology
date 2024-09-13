

export interface HeaderProps {
  title: string
}

function Header(props: HeaderProps) {
  return <div className="text-xl flex items-center justify-center font-bold text-white bg-black w-full h-10">{ props.title }</div>
}

export { Header }
