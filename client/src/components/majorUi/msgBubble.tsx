import dayjs from 'dayjs'
import React from 'react'
import { Button, Input, Tooltip, TooltipContent, TooltipTrigger } from '../ui'
import { projectInterface } from '@/lib/interfaces'
import { MdMarkUnreadChatAlt } from "react-icons/md";

export default function MsgBubble({project,setOpen,open}:{project:projectInterface|null,setOpen:React.Dispatch<React.SetStateAction<boolean>>,open:boolean}) {
    const [chatInput, setChatInput] = React.useState("")
    const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(chatInput);
    }
  return (
    <>
     <Tooltip>
      <TooltipTrigger asChild>
    <Button className='fixed bottom-4 right-10 z-50 w-10 h-10 rounded-full' variant={"outline"} onClick={(e) =>{
        e.stopPropagation()
        setOpen(e=>!e)
        }}>
            <MdMarkUnreadChatAlt className='text-3xl'/>
            </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Drop a message</p>
      </TooltipContent>
    </Tooltip>
    <div onClick={(e) => e.stopPropagation()} className={`${open?"block":"hidden"} border fixed p-4 rounded-lg  right-3 backdrop-blur-xl bottom-[9%] h-[77vh] w-[400px] flex flex-col justify-between z-40 shadow-md shadow-muted`}>
    <div className='mb-4'>
  <h3 className="text-lg font-semibold ">Messages</h3>
  <p className='text-muted-foreground text-sm'> This isn’t a real-time chat. Feel free to send any questions, updates, or additional details — our team will get back to you as soon as possible.</p>
    </div>
  <div className="max-h-80 overflow-y-auto space-y-4 p-2 bg-muted/30 rounded-lg">
    {project&&project.message.map((msg, idx) => (
        <div
        key={idx}
        className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
        >
        <div
          className={`rounded-xl px-4 py-2 max-w-xs break-words shadow-sm
            ${msg.from === 'client'
                ? 'bg-primary text-white rounded-br-none'
                : 'bg-muted text-foreground rounded-bl-none'}
                `}
                >
          <p className="text-sm">{msg.message}</p>
          <p className="text-xs mt-1 text-muted-foreground text-right">
            {dayjs(msg.timestamp).format("MMM D, h:mm A")}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Message Input */}
  <form onSubmit={handleMessageSend} className="mt-4 flex gap-2">
    <Input
      value={chatInput}
      onChange={(e) => setChatInput(e.target.value)}
      placeholder="Type a message..."
      />
    <Button type="submit">Send</Button>
  </form>
</div>
      </>
  )
}
