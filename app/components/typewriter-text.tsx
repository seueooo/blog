'use client'

import { useState, useEffect, useRef } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  speed?: number
  startDelay?: number
}

export function TypewriterText({
  text,
  className,
  style,
  speed = 35,
  startDelay = 300,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [startDelay])

  useEffect(() => {
    if (!isTyping) return

    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        const currentChar = text[indexRef.current]
        setDisplayedText(text.slice(0, indexRef.current + 1))
        indexRef.current++

        // Variable timing for natural feel
        let delay = speed
        if (currentChar === '.' || currentChar === ',') {
          delay = speed * 4 // Pause at punctuation
        } else if (currentChar === ' ') {
          delay = speed * 0.5 // Faster through spaces
        } else {
          // Add slight randomness for organic feel
          delay = speed + (Math.random() - 0.5) * 20
        }

        setTimeout(typeNextChar, delay)
      } else {
        setIsComplete(true)
      }
    }

    typeNextChar()
  }, [isTyping, text, speed])

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <p className={className} style={{ ...style, position: 'relative' }}>
      {/* Invisible text to maintain full height */}
      <span style={{ visibility: 'hidden' }} aria-hidden="true">
        {text}
      </span>
      {/* Visible typing text overlaid on top */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        {displayedText}
        <span
          style={{
            opacity: showCursor ? 1 : 0,
            transition: 'opacity 0.1s ease',
            marginLeft: '1px',
            color: 'var(--foreground)',
          }}
          aria-hidden="true"
        >
          {isComplete ? '' : '│'}
        </span>
      </span>
    </p>
  )
}
