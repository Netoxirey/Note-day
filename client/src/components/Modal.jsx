
// eslint-disable-next-line react/prop-types
function Modal({children}) {
  return (
    <div className="modal flex justify-center items-center z-10 bg-[#ffffff33]">
        {children}
    </div>
  )
}

export default Modal