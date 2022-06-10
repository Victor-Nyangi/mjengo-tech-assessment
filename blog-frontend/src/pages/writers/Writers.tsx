import {FC,  useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import apiClient from '../../services/api';

const Writers:FC = () => {
  const [writers, setWriters] = useState([])

  useEffect(() => {
    const getWriters = async () => {
      apiClient.get('/api/users').then((response: any) => {
        if(response.data.status === "success"){
          const {users} = response.data;
          setWriters(users)
        }
      })
    }

    getWriters()
  }, [])

  return (
   <div>
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Writers Table
          </p>
        </div>
        <p className="text-base text-gray-700 md:text-lg">
            Only accessible by Administrator
        </p>
      </div>
  <div className="flex justify-center">
    <div className="w-8/12 bg-white p-6 rounded-lg">
      <div>
          { writers ?
      <table className="table p-4 bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              #
            </th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Name
            </th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Email
            </th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Username
            </th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Joined on
            </th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
             writers.map((writer: any, index: number ) => (
              <tr className="text-gray-700" key={index}>
              <td className="border-b-2 p-4 dark:border-dark-5">
                {writer.id && writer.id}
              </td>
              <td className="border-b-2 p-4 dark:border-dark-5">
              {writer.name && writer.name}

              </td>
              <td className="border-b-2 p-4 dark:border-dark-5">
              {writer.email && writer.email}

              </td>
              <td className="border-b-2 p-4 dark:border-dark-5">
              {writer.username && writer.username}

              </td>
              <td className="border-b-2 p-4 dark:border-dark-5">
                {writer.created_at && moment(writer?.created_at).format('YYYY-MM-DD')}
              </td>
              <td className="border-b-2 p-4 dark:border-dark-5">
              <Link to={`/view/writer/${writer.username}`}
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-green-400 hover:text-deep-purple-800"
          >
         View
        </Link>

              </td>
            </tr>
            ))}


            </tbody>
            </table>
            : <p>There are no users</p>

}

            </div>

    </div>
  </div>
</div>

  )
}

export default Writers