"use client"
import React, { useEffect } from 'react'
import { Button, 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  Loader,
  Label,
  Input} from '../ui'
import FirstFormSection from './firstFormSection'
import SecondFormSection from './secondFormSection'
import ThirdFormSection from './thirdFormSection'
import axios, { AxiosError } from 'axios'
import { serverUrl } from '@/lib/exportEnv'
import { userAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { useRouter } from 'nextjs-toploader/app'

export default function CreateProject() {
  const [user, setUser] = useAtom(userAtom)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
    const [steps, setSteps] = React.useState(1)
    const [projectName, setProjectName] = React.useState("")
    const [projectDesc, setProjectDesc] = React.useState("")
    const [designPreference, setDesignPreference] = React.useState("")
    const [projectType, setProjectType] = React.useState("")
    const [urgency, setUrgency] = React.useState("normal")
    const [projectLink, setProjectLink] = React.useState("")
    const [techPreference, setTechPreference] = React.useState("")
    const [maxBudget, setMaxBudget] = React.useState("")
    const [minBudget, setMinBudget] = React.useState("")
    const [userEmail, setUserEmail] = React.useState("")
    const [error, setError] = React.useState("")
    const [existedUser, setExistedUser] = React.useState<null|boolean>(null)

    useEffect(() => {
      setError("")
      setExistedUser(null)
    },[projectName, projectDesc, designPreference, projectType, maxBudget, minBudget, techPreference, userEmail])
    const checkUser = async()=>{
      if(error === "User not found"){
        setError("")
      }
      setExistedUser(null)
      try {
       await axios.post(`${serverUrl}/super-admin/check-user`,{userEmail}, { withCredentials: true })
        setExistedUser(true)
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 400) {
            setExistedUser(false)
            setError(error.response?.data.message)
            return
          }
          if (error.status === 401) {
            setUser(null)
            router.push("/")
            return
          }
        }
      }
    }
    const handleCreate = async()=>{
      if (user?.type=== "admin") {
        if (!userEmail) {
          setError("User email is required")
          return
        }
      }
      if (!projectName) {
        setError("Project name is required")
        return
      }
      if (!projectDesc) {
        setError("Project description is required")
        return
        
      }
      if (!designPreference) {
        setError("Design preference is required")
        return
      }
      if (!projectType) {
        setError("Project type is required")
        return
      }
      if (!maxBudget) {
        setError("Max budget is required")
        return
      }
      if (!minBudget) {
        setError("Min budget is required")
        return
      }
      try{
        setLoading(true)
        const res = await axios.post(`${serverUrl}/${user?.type==="admin"?"super-admin":"user"}/create-project`, { projectTitle:projectName, projectDescription:projectDesc, designPreference, projectType, maxBudget, minBudget, techPreference, userEmail }, { withCredentials: true })
        setProjectName("")
        setProjectDesc("")
        setDesignPreference("")
        setProjectType("")
        setMaxBudget("")
        setMinBudget("")
        setTechPreference("")
        setSteps(1)
        router.push(`/projects`)
      }catch(error){
        if (error instanceof AxiosError) {
          if (error.status === 400) {
            setError(error.response?.data.message)
          }
          if(error.status === 401){
            setUser(null)
            router.push("/")
          }
        }
      }finally{
      setLoading(false)
    }
    }
    const next = () => {
        if (steps < 3) {
            setSteps(steps + 1)
        }
    }
    const back = () => {
        if (steps > 1) {
            setSteps(steps - 1)
        }
    }
    if (loading) {
      return (
        <div className='h-[88vh]'>
          <Loader/>
        </div>
      )
    }
    return (
       <div className="px-4 md:px-6">
  <Card className="max-w-2xl mx-auto mb-10 md:my-10 rounded-2xl shadow-lg">
    <CardHeader className="border-b ">
      <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
        Create a Project
      </CardTitle>
    </CardHeader>

    <CardContent className="">
      {
        user?.type==="admin"&& steps === 1 &&
          <div className="flex items-center gap-2 mb-2">
          <Label className="text-sm md:text-base font-semibold mb-1 text-foreground">
            User Email:
          </Label>
          <Input
            placeholder="Enter user email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className={`rounded-lg text-base ${userEmail&&existedUser===false?"border-red-500":""} ${userEmail&&existedUser===true?"border-green-500":""}`}
          />
          <Button onClick={checkUser}>Check</Button>
        </div>
      }
      {steps === 1 && (
        <FirstFormSection
          projectDesc={projectDesc}
          setProjectDesc={setProjectDesc}
          projectName={projectName}
          setProjectName={setProjectName}
        />
      )}

      {steps === 2 && <SecondFormSection projectLink={projectLink} setProjectLink={setProjectLink} designPreference={designPreference} setDesignPreference={setDesignPreference} projectType={projectType} setProjectType={setProjectType} urgency={urgency} setUrgency={setUrgency} />}
      {steps === 3 && <ThirdFormSection maxBudget={maxBudget} minBudget={minBudget} setMaxBudget={setMaxBudget} setMinBudget={setMinBudget} techPreference={techPreference} setTechPreference={setTechPreference}/>}
    </CardContent>
    {error && <p className="text-red-500 text-center">{error}</p>}
    <CardFooter className="flex items-center justify-between border-t pt-4">
      <Button
        disabled={steps === 1}
        onClick={back}
        variant="outline"
        className="rounded-full font-semibold"
      >
        Back
      </Button>

      <span className="text-muted-foreground text-sm md:text-base">{steps} of 3</span>

      {steps > 2 ? (
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full font-semibold">Create</Button>
        </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Project</AlertDialogTitle>
          <AlertDialogDescription>
            Project details will be locked after submission. You’ll still be able to view updates, receive a quote, negotiate with a counter-offer, and message the admin directly.
          </AlertDialogDescription>
        </AlertDialogHeader>
                <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='font-semibold' onClick={handleCreate}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

      ) : (
        <Button onClick={next} className="rounded-full font-semibold">
          Next
        </Button>
      )}
    </CardFooter>
  </Card>
</div>

    )
}
