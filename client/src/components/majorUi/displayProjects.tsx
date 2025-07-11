import React, { useEffect } from 'react'
import { Button, Card, CardContent, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { projectInterface } from '@/lib/interfaces';
import { useRouter } from 'nextjs-toploader/app';
import InViewAnimation from './inViewAnimation';
import { statusMap } from '@/lib/statusMap';
import { userAtom } from '@/lib/atoms';
import { useAtom } from 'jotai';

dayjs.extend(relativeTime);

export default function DisplayProjects({projects}:{projects:projectInterface[]|null}) {
  const [user, setUser] = useAtom(userAtom)
    const router = useRouter()
    if (!projects||projects.length === 0) {
      return(
        <InViewAnimation  delay={0.35}>
          <div className='flex flex-col h-[60vh] justify-center items-center'>
              <h3 className="font-semibold text-xl text-foreground/80">No projects found !!</h3>
              <h3 className='text-foreground/50 px-4 py-2 rounded-md text-center'>Try changing filters or create a new one to get started.</h3>
          </div>
        </InViewAnimation>
      )
    }
  return (
    <InViewAnimation delay={0.35}>
    <>
    <div className='mt-10 hidden md:block'>
            <Table >
                <TableCaption>A list of your projects.</TableCaption>
                <TableHeader className='sticky top-0'>
                    <TableRow className='text-lg font-bold'>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className='text-right'>Type</TableHead>
                        <TableHead className='text-right'>Updated At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
            {projects?.map((project:projectInterface) => (
                <TableRow onClick={() => user?.type==="user"? router.push(`/projects/${project._id}`):router.push(`/admin/projects/${project._id}`)} className='cursor-pointer' key={project._id}>
                    <TableCell className="font-medium">{project.projectTitle}</TableCell>
                    <TableCell className={`${statusMap[project.status].color} flex justify-end items-center gap-1`}>
                        {statusMap[project.status].icon}{statusMap[project.status].label}</TableCell>
                    <TableCell className="text-right">{project.projectType}</TableCell>
                    <TableCell className="text-right">{dayjs(project.updatedAt).fromNow()}</TableCell>
                </TableRow>
                
              ))}
            </TableBody>
            </Table>
        </div>
            <div className="md:hidden block my-8">
  {projects && projects.map(p => (
    <Card onClick={() => router.push(`/projects/${p._id}`)} className='mb-4 cursor-pointer hover:bg-muted' key={p._id}>
        <CardContent>
      <h3 className="font-semibold text-lg">{p.projectTitle}</h3>
      <p className="text-sm text-muted-foreground">{p.projectType}</p>
      <div className="flex justify-between text-sm mt-2">
        <span className={` ${statusMap[p.status].color} flex justify-end items-center gap-1`}> {statusMap[p.status].icon}{statusMap[p.status].label}</span>
        <span>{dayjs(p.updatedAt).fromNow()}</span>
      </div>
        </CardContent>
    </Card>
  ))}
</div>
  </>
  </InViewAnimation>
  )
}
