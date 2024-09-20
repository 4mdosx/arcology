'use client'
import { useToast } from '@/hooks/useToast'
import { useState, useEffect } from 'react'
import { Header } from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card'
import MaterialSymbols from '@/components/material_symbols'
import { Progress } from "@/components/ui/progress"

function CurrentMission({ issue }: any) {
  return (
    <Card className="bg-gray-50 shadow-md shadow-emerald-300">
      <CardHeader>
        <div className="text-2xl font-bold">建造一个{issue.building.name}</div>
        <Progress value={13} className='w-full'></Progress>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center mb-4">
           {/* 工作详情  */}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
        <div className="flex items-center">
          <MaterialSymbols raw="&#xe53e;" />
          <span>{issue.reward}</span>
        </div>
          <Button disabled>Completed</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function IssueItem({ issue, acceptIssue }: any) {
  return (
    <Card className="bg-gray-50 shadow-md shadow-emerald-300">
      <CardHeader>
        <div className="text-2xl font-bold">建造一个{issue.building.name}</div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center mb-4">
          <MaterialSymbols raw="&#xe53e;" />
          <span>{issue.reward}</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button onClick={() => acceptIssue(issue)}>Accept</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function Page() {
  const [currentMission, setCurrentMission] = useState<any | null>(
  )
  const [list, setList] = useState<any[]>([])

  // if (!currentMission && list.length === 0) {
  //   setList(game.mission.generate())
  // }
  useEffect(() => {
    if (!currentMission && list.length === 0) {
    }
  }, [])

  function acceptIssue(issue: any) {

  }

  return (
    <main>
      <div
        className="page flex flex-col align-top justify-start p-4 pb-40"
        style={{ backgroundColor: '#110d0d' }}
      >
        <h1 className="text-2xl font-bold text-white mb-4">
          Today&apos;s Issue
        </h1>
        {currentMission ? (
          <CurrentMission issue={currentMission} />
        ) : (
          // 任务列表
          list.map((item, index) => {
            return (
              <div key={item.id} className='mb-4'>
                <IssueItem issue={item} acceptIssue={acceptIssue} />
              </div>
            )
          })
        )}
      </div>
    </main>
  )
}
