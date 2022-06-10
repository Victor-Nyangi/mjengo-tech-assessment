import {FC} from 'react'
import { Link } from 'react-router-dom'
const NotFound:FC = () => {
  return (
    <>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="flex flex-col mb-16 sm:text-center sm:mb-0">

          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              Lost again
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Unfortunately the page you are looking for can not be found, please visit the posts section.
            </p>
          </div>
          <div>
            <Link to="/posts"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-purple-900 focus:shadow-outline focus:outline-none"
            >
              View posts
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default NotFound