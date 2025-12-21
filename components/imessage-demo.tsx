'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  sender: 'user' | 'other'
  isTyping?: boolean
}

const conversationSets = [
  // Set 1: Email transformation
  [
    { text: "Hey! Just finished that lengthy email to the client 📧", sender: 'user' as const },
    { text: "Nice! How'd it turn out?", sender: 'other' as const },
    { text: "It was way too formal and robotic 😅 Used Diploscribe to make it sound more human and friendly", sender: 'user' as const },
    { text: "Wait, you can do that? I always struggle with tone in emails", sender: 'other' as const },
    { text: "Yeah! It's amazing. You just paste your text, pick the style you want, and boom - instant transformation ✨", sender: 'user' as const },
    { text: "That would've saved me hours last week when I had to rewrite those 10 customer emails 🤦‍♂️", sender: 'other' as const },
    { text: "Exactly! Plus it works for social posts, reports, everything. Even has Gmail integration so you can send directly", sender: 'user' as const },
    { text: "Okay you've convinced me. Sending this to myself right now 🚀", sender: 'other' as const },
  ],
  // Set 2: Social media content
  [
    { text: "Ugh, need to post on LinkedIn but everything I write sounds so stiff 😤", sender: 'user' as const },
    { text: "Classic corporate speak problem lol", sender: 'other' as const },
    { text: "Right?! Just used Diploscribe to transform my boring update into something actually engaging", sender: 'user' as const },
    { text: "No way, does it really work for social media too?", sender: 'other' as const },
    { text: "Totally! Changed my post from 'We are pleased to announce' to genuine human conversation 💯", sender: 'user' as const },
    { text: "My Instagram captions could use that... they all sound like press releases 😂", sender: 'other' as const },
    { text: "Perfect use case! It even keeps your emojis and adjusts the vibe. Casual, professional, funny - whatever you need 🎯", sender: 'user' as const },
    { text: "Okay I'm trying this right now. My followers deserve better content! 📱", sender: 'other' as const },
  ],
  // Set 3: Customer support
  [
    { text: "Boss just dumped 50 customer complaint emails on my desk 😩", sender: 'user' as const },
    { text: "Brutal! That's gonna take all day", sender: 'other' as const },
    { text: "Not anymore! Using Diploscribe to transform my template responses into personalized replies ⚡", sender: 'user' as const },
    { text: "Wait, how does that even work? Don't they all sound the same?", sender: 'other' as const },
    { text: "That's the cool part - each one feels unique and empathetic. Went from robotic to genuinely caring in seconds 🎭", sender: 'user' as const },
    { text: "So you're saying you could actually finish that in like an hour?", sender: 'other' as const },
    { text: "Already done! 50 personalized responses in 30 minutes. Each customer gets a thoughtful reply, not copy-paste garbage 💪", sender: 'user' as const },
    { text: "This is a game changer. Forwarding to our whole support team! 🔥", sender: 'other' as const },
  ],
]

export function IMessageDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentConversation = conversationSets[currentSetIndex]

  // Smooth auto-scroll to bottom when messages change
  useEffect(() => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight
      const height = containerRef.current.clientHeight
      const maxScrollTop = scrollHeight - height
      
      containerRef.current.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth'
      })
    }
  }, [messages])

  useEffect(() => {
    if (currentIndex >= currentConversation.length) {
      // Move to next conversation set after a pause
      const resetTimer = setTimeout(() => {
        setMessages([])
        setCurrentIndex(0)
        setCurrentSetIndex((prev) => (prev + 1) % conversationSets.length)
      }, 2000)
      return () => clearTimeout(resetTimer)
    }

    const nextMessage = currentConversation[currentIndex]
    
    // Show typing indicator for ALL messages (both user and other)
    const typingTimer = setTimeout(() => {
      setIsTyping(true)
      const typingId = `typing-${currentSetIndex}-${currentIndex}`
      setMessages(prev => [...prev, { 
        id: typingId, 
        text: '', 
        sender: nextMessage.sender, 
        isTyping: true 
      }])

      // After 2 seconds of typing, replace with real message
      const messageTimer = setTimeout(() => {
        setMessages(prev => 
          prev.filter(m => m.id !== typingId).concat({
            id: `${currentSetIndex}-${currentIndex}`,
            text: nextMessage.text,
            sender: nextMessage.sender,
            isTyping: false
          })
        )
        setIsTyping(false)
        setCurrentIndex(prev => prev + 1)
      }, 2000) // 2 seconds for typing indicator

      return () => clearTimeout(messageTimer)
    }, 2000) // 2 seconds pause before next message starts

    return () => clearTimeout(typingTimer)
  }, [currentIndex, currentSetIndex, currentConversation])

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Chat Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[500px] overflow-y-auto overflow-x-hidden scrollbar-hide"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <motion.div 
          className="flex flex-col gap-3 px-4 py-6 pb-32"
          layout
        >
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30,
                  mass: 1
                }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.isTyping ? (
                  <div className={`px-4 py-3 rounded-[18px] flex items-center gap-1 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 rounded-br-md'
                      : 'bg-gray-300 dark:bg-gray-600 rounded-bl-md'
                  }`}>
                    <motion.span
                      className={`w-2 h-2 rounded-full ${
                        message.sender === 'user' 
                          ? 'bg-white' 
                          : 'bg-gray-600 dark:bg-gray-300'
                      }`}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.span
                      className={`w-2 h-2 rounded-full ${
                        message.sender === 'user' 
                          ? 'bg-white' 
                          : 'bg-gray-600 dark:bg-gray-300'
                      }`}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                      }}
                    />
                    <motion.span
                      className={`w-2 h-2 rounded-full ${
                        message.sender === 'user' 
                          ? 'bg-white' 
                          : 'bg-gray-600 dark:bg-gray-300'
                      }`}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`px-4 py-3 max-w-[75%] rounded-[18px] ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
                    }`}
                  >
                    <p className="text-[15px] leading-snug">{message.text}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
