'use client';

import {useChat} from "ai/react"
import {useEffect, useRef} from 'react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import {SendHorizontalIcon} from 'lucide-react'
import CopyToClipboard from "../components/copy-to-clipboard"


export default function Chat() {
    const ref = useRef<HTMLDivElement>(null)
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = 
     useChat({
        initialMessages: [
            {
                id: Date.now().toString(),
                role: 'system',
                content: ' You are an employee at a large AV company with 25 years experience in technical, documentation, sales, service, Project management, designer roles.'
            }
        ]
    })
    useEffect(() => {
        if(ref.current === null) return
        ref.current.scrollTo(0, ref.current.scrollHeight)
    }, [messages])
    return ( 
        <section className='text-zinc-700'>
            <div className='container flex -h-screen flex-col items-center justify-center'>
                <h1 className='font-serif text-2x1 font-bold'>ATI Chatbot </h1>
                <div className='mt-4 w-full max-w-lg'>
                        { /* response container */}
                        <ScrollArea
                            className='mb-2 h-[400px] rounded-md border p-4'
                            ref={ref}
                        >
                            {error && (
                                <div className='text-sm text-red-400'>{error.message}</div>
                            )}
                            {messages.map(m=> (
                                <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12'>
                                    {m.role === 'user' && (
                                        <div className='mb-6 flex gap 3'>
                                            <Avatar>
                                                <AvatarImage src='' />
                                                <AvatarFallback className='text-sm'>U</AvatarFallback>
                                            </Avatar>
                                            <div className='mt-1.5'>
                                                <p className='font-semibold'>You</p>
                                                <div className='mt-1.5 text-sm text-zinc-500'>
                                                    {m.content}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {m.role === 'assistant' && (
                                        <div className='mb-6 flex gap-3'>
                                            <Avatar>
                                                <AvatarImage src='' />
                                                <AvatarFallback className='bg-emerald-500 text-white'>
                                                    ATI
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className='mt-1.5 w-full'>
                                                <div className='flex justify-between'>
                                                    <p className='font-semibold'>ATI Assistant </p>
                                                    <CopyToClipboard message={m} className='mt-1' />
                                                </div>
                                                <div className='mt-2 text-sm text-zinc-500'>
                                                    {m.content}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ScrollArea>

                        {/*Input Form */}
                    <form onSubmit={handleSubmit} className='relative'>
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            placeholder='Ask me anything...'
                            className='pr-12 placeholder:italic placeholder:text-zinc-6000'
                        />
                        <Button 
                            size='icon'
                            type='submit'
                            variant='secondary'
                            disabled={isLoading}
                            className='absolute right-1 top-1 h-8 w-10'
                        >
                            <SendHorizontalIcon className='h-5 w-5 text-emerald-500'/>
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}