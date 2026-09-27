import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

function fallbackCopy(text: string) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand('copy')
  } catch {
    // ignore
  }
  document.body.removeChild(ta)
}

export default function CopyText({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        fallbackCopy(text)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      try {
        fallbackCopy(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
      } catch {
        // clipboard unavailable
      }
    }
  }

  return (
    <button
      type="button"
      className={`copy-text${copied ? ' is-copied' : ''}`}
      onClick={copy}
      title={copied ? 'Copied!' : 'Tap to copy'}
      aria-label={label ?? `Copy ${text}`}
    >
      <code>{text}</code>
      {copied ? (
        <Check size={13} aria-hidden="true" />
      ) : (
        <Copy size={13} aria-hidden="true" />
      )}
    </button>
  )
}
