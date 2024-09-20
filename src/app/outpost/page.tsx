'use client'
import { useToast } from '@/hooks/useToast'
import { useState, useEffect } from 'react'
import { Header } from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import MaterialSymbols from '@/components/material_symbols'

export default function Page() {
  const toast = useToast()
  const [power, setPower] = useState(0)
  const maxPower = 100
  const length = Math.floor(power / maxPower * 19)
  function changer () {
    toast.show('Fully charged to maximum capacity.')
  }


  return (
    <main>
      <Header title="Outpost" />
      <div className="page flex flex-col align-top justify-start p-4 pb-40">
        <Card>
          <CardContent className='p-4 relative'>
            <div className='flex items-top'>
            <Image src="/img/outpost.png" alt="Outpost" width={60} height={60} className='rounded-lg' style={{ filter: `grayscale(${100 - length * 2}%)` }}/>
            <div className='flex flex-col ml-2'>
              <span className='text-xl font-bold'>Nexus</span>
              <span className='text-sm text-gray-400'>...</span>
            </div>
            </div>
            <Button className='absolute top-4 right-4' variant="outline">
              <MaterialSymbols name="star" />
            </Button>
            <hr className='my-4 mb-2' />
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-500'>Power { power } / { maxPower }</span>
              <Button onClick={changer} className="underline">
                Recharge
              </Button>
            </div>
            <div className='flex mt-2'>
              {
                Array.from({ length }, (_, i) => (
                  <span key={i} className='power-bar h-6 bg-yellow-300' style={{ width: `5%`, marginRight: '2px' }}></span>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
