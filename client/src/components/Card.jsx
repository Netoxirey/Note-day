import { useEffect, useRef, useState } from "react"
// eslint-disable-next-line react/prop-types
function Card({children}) {
    const cardRef = useRef();
    const[cardPosition, setCardPosition] = useState({x: 0, y: 0});
    const [ mousePosition, setMousePosition] = useState({x: 0, y: 0})
    useEffect(() => {
        if(cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            setCardPosition({
                x: rect.left +  window.scrollX,
                y: rect.top + window.scrollY,
            })
        }
    },[])
    const handleMove = (e) => {
        const { clientX, clientY } = e
        const relativeX = clientX - cardPosition.x
        const relativeY = clientY - cardPosition.y

        setMousePosition({x: relativeX, y: relativeY});
    }
    const flashBg = {
        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(23, 101, 223, 0.20), transparent 40%)`,
  };
    
  return (
    <div 
    ref={cardRef}
    className="w-80 mx-auto flex flex-col p-6 gradient-card border border-slate-800 items-center gap-3 rounded-lg relative group shadow-sm"
    onMouseMove={handleMove}
    >
        <div className="absolute-ct opacity-0 group-hover:opacity-100 " style={flashBg}/>
        {children}
    </div>
  )
}

export default Card