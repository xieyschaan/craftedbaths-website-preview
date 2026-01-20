'use client'

import { useState } from 'react'
import { Button, Input, Textarea } from '@/components/ui'
import { supabase } from '@/lib/supabase/client'

interface ContactFormProps {
  formType?: 'general' | 'trade' | 'showroom'
  showroomId?: string
  onSuccess?: () => void
}

export default function ContactForm({ 
  formType = 'general', 
  showroomId,
  onSuccess 
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert({
          form_type: formType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
          showroom_id: showroomId || null,
          metadata: {},
        })

      if (submitError) {
        setError('Failed to submit form. Please try again.')
        setLoading(false)
        return
      }

      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-200 p-spacing-lg">
        <p className="font-gilroy text-body text-green-700">
          Thank you for your message! We'll get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-spacing-md">
      {error && (
        <div className="bg-red-50 border-2 border-red-200 p-spacing-md">
          <p className="font-gilroy text-sm text-red-600">{error}</p>
        </div>
      )}

      <Input
        label="Name"
        type="text"
        placeholder="Your name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        disabled={loading}
      />

      <Input
        label="Email"
        type="email"
        placeholder="your.email@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        disabled={loading}
      />

      <Input
        label="Phone (Optional)"
        type="tel"
        placeholder="Your phone number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        disabled={loading}
      />

      <Textarea
        label="Message"
        placeholder="Your message..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        disabled={loading}
        rows={6}
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={loading}
        disabled={loading}
      >
        Send Message
      </Button>
    </form>
  )
}
