import EditProfile from '@/components/user/EditProfile'
import React from 'react'
import UserLayout from '../Layout'

function page() {
  return (
    <div>
      <UserLayout>
        <EditProfile/>
        </UserLayout>
    </div>
  )
}

export default page