import React from 'react'
import UpdateContainer from '../../containers/UpdateContainer'
import { useParams } from 'react-router-dom'

const Update = () => {
  const { no } = useParams()
  console.log(`no : ${no}`)
  return (
    <>
        {/* Header */}
        <UpdateContainer no={no} />
        {/* Footer */}  
    </>
  )
}

export default Update