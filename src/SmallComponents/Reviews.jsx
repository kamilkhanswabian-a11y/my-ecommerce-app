import React from 'react'

function Reviews({children, className= '', ...props}) {
  return (
              <>
                   <div className={className} {...props}>
                             {children}
                   </div>
              </>
  )
}

export default Reviews