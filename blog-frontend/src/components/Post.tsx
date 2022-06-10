import {FC} from 'react'
import { Link } from 'react-router-dom'

const Post:FC = () => {
  return (
    <><div className="mb-4">
  <Link to="#" className="font-bold" >Nmasme</Link> <span className="text-gray-600 text-sm">8923:/232/12</span>
  <p className="mb-2">skdlsdklsdlsdklskld</p>
  <form action="#" method="post">
    <button type="submit" className="text-blue-500">Delete</button>
  </form>
  <div className="flex items-center">
    <form action="#" method="post" className="mr-1">
      <button type="submit" className="text-blue-500">Like</button>
    </form>
    <form action="#" method="post" className="mr-1">
      <button type="submit" className="text-blue-500">Unlike</button>
    </form>
  </div>
</div>

</>
  )
}

export default Post