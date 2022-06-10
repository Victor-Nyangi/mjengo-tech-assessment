import {FC} from 'react'

const Home:FC = () => {
  return (
    <>
 <div className="flex justify-center">
  <div className="w-10/12 bg-white p-6 rounded-lg">
<section className="px-4 py-10 mx-auto max-w-7xl">
  <div className="w-full mx-auto lg:w-8/12 xl:w-5/12">
    <p className="mb-2 text-xs font-semibold text-gray-400 uppercase">By Victor Gichui</p>
    <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">The Dev Blog</h1>
    <p className="mb-5 text-base text-gray-500 md:text-lg">
        This Blog is a mini full-stack web application built using React, Tailwind and Typescript with a Laravel API backend.</p>
  </div>
</section>
  </div>
</div>

</>
  )
}

export default Home