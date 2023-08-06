import React from 'react'
import { Card } from 'react-bootstrap'

const CardComponent = ({className='',...props}) => {
  return (
    <Card className={`border-0 shadow-sm mt-3 p-lg-3 p-3 ${className}`} {...props}>
        
    </Card>
  )
}

export default CardComponent