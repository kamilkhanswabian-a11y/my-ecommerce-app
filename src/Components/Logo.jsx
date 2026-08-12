
function Logo() {
  return (
        <>   
    <div className="flex items-center gap-2 cursor-pointer select-none group">
      {/* Monogram Minimalist Shape */}
      <div className="flex items-center justify-center w-9 h-9 border-2 border-black rounded-full group-hover:rotate-12 transition-transform duration-300">
        <span className="text-sm font-black text-black tracking-widest translate-x-[0.5px]">
          A
        </span>
      </div>

      {/* High-End Clean Typography */}
      <span className="text-lg font-black tracking-[0.2em] text-black uppercase">
         Aura
      </span>
    </div>
      </>
  )
}

export default Logo