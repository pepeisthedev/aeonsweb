'use client'

import { useState, useEffect } from 'react'

interface SubmissionFormProps {
  isLoggedIn: boolean
}

interface FormData {
  name: string
  description: string
  artist: string
  contentUrl: string
  contentType: string
}

export function SubmissionForm({ isLoggedIn }: SubmissionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    artist: '',
    contentUrl: '',
    contentType: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submissionAuthorId, setSubmissionAuthorId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserSubmission()
    }
  }, [isLoggedIn])

  const fetchUserSubmission = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/submissions?my=true')
      if (response.ok) {
        const submission = await response.json()
        if (submission) {
          setSubmissionAuthorId(submission.discord_id)
          setFormData({
            name: submission.name,
            description: submission.description,
            artist: submission.artist_name,
            contentUrl: submission.twitter_url,
            contentType: submission.content_type,
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch user submission:', error)
      setMessage('Failed to fetch your submission. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters.'
    if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters.'
    if (formData.artist.length < 2) newErrors.artist = 'Artist name must be at least 2 characters.'
    if (!formData.contentUrl.startsWith('http')) newErrors.contentUrl = 'Please enter a valid URL.'
    if (!formData.contentType) newErrors.contentType = 'Please select a content type.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    const method = submissionAuthorId ? 'PUT' : 'POST'
    const url = '/api/submissions'

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({      
          name: formData.name,
          description: formData.description,
          twitter_url: formData.contentUrl,
          content_type: formData.contentType,
          artist_name: formData.artist,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(submissionAuthorId ? 'Submission updated successfully!' : 'Submission created successfully!')
        if(method == "POST") {
          await fetchUserSubmission()
        }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save submission')
      }
    } catch (error) {
      console.error('Failed to save submission:', error)
      setMessage(error instanceof Error ? error.message : 'An error occurred while saving the submission.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!submissionAuthorId) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/submissions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },       
      })

      if (response.ok) {
        setSubmissionAuthorId(null)
        setFormData({
          name: '',
          description: '',
          artist: '',
          contentUrl: '',
          contentType: '',
        })
        setMessage('Submission deleted successfully!')
      } else {
        throw new Error('Failed to delete submission')
      }
    } catch (error) {
      console.error('Failed to delete submission:', error)
      setMessage('An error occurred while deleting the submission.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-lg font-medium">Please log in to submit or view your submission.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{submissionAuthorId ? 'Edit Your Submission' : 'Create a New Submission'}</h2>
        <p className="text-gray-500">
          {submissionAuthorId ? 'Update your existing submission or delete it.' : 'Fill out the form below to create a new submission.'}
        </p>
      </div>
      {message && (
        <div className={`p-4 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`text-black mt-1 block w-full rounded-md shadow-sm ${errors.name ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            placeholder="Enter the name of your submission"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`text-black mt-1 block w-full rounded-md shadow-sm ${errors.description ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            placeholder="Describe your submission"
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            className={`text-black mt-1 block w-full rounded-md shadow-sm ${errors.artist ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            placeholder="Enter the artist's name"
          />
          {errors.artist && <p className="mt-1 text-sm text-red-600">{errors.artist}</p>}
        </div>
        <div>
          <label htmlFor="contentUrl" className="block text-sm font-medium text-gray-700">Link to X Post</label>
          <input
            type="url"
            id="contentUrl"
            name="contentUrl"
            value={formData.contentUrl}
            onChange={handleChange}
            className={`text-black mt-1 block w-full rounded-md shadow-sm ${errors.contentUrl ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            placeholder="https://x.com/your-content"
          />
          {errors.contentUrl && <p className="mt-1 text-sm text-red-600">{errors.contentUrl}</p>}
        </div>
        <div>
          <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">Content Type</label>
          <select
            id="contentType"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            className={`text-black mt-1 block w-full rounded-md shadow-sm ${errors.contentType ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
          >
            <option value="">Select a content type</option>
            <option value="Image">Image</option>
            <option value="Video">Video</option>
            <option value="Music">Music</option>
            <option value="Other">Other</option>
          </select>
          {errors.contentType && <p className="mt-1 text-sm text-red-600">{errors.contentType}</p>}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : (submissionAuthorId ? 'Update Submission' : 'Create Submission')}
          </button>
          {submissionAuthorId && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              Delete Submission
            </button>
          )}
        </div>
      </form>
    </div>
  )
}