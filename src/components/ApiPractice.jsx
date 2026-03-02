import { useState, useEffect } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import { Button, Form, Table, Alert, Spinner, Container } from 'react-bootstrap'
import { confirmDialog, alertSuccess, alertError } from '../utils/sweetAlert'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export default function ApiPractice() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({ title: '', body: '' })
  const [submitting, setSubmitting] = useState(false)
  
  // Edit mode state
  const [editingId, setEditingId] = useState(null)
  const [updating, setUpdating] = useState(false)
  
  // Delete loading states
  const [deletingId, setDeletingId] = useState(null)

  // Fetch posts on component mount (GET)
  useEffect(() => {
    document.title = 'API Functionality'
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${API_BASE_URL}/posts?_limit=10`)
      // mix English and Tagalog content
      const tagalogTitles = [
        'sunt aut facere... (Tagalog)',
        'qui est esse (Tagalog)',
        'ea molestias quasi... (Tagalog)',
        'eum et est occaecati (Tagalog)',
        'nesciunt quas odio (Tagalog)',
        'dolorem eum magni eos... (Tagalog)',
        'magnam facilis autem (Tagalog)',
        'dolorem dolore est ipsam (Tagalog)',
        'nesciunt iure omnis... (Tagalog)',
        'optio molestias id quia eum (Tagalog)'
      ]
      const tagalogBodies = [
        'quia et suscipit... (Tagalog)',
        'est rerum tempore... (Tagalog)',
        'et iusto sed quo iure... (Tagalog)',
        'ullam et saepe reiciendis... (Tagalog)',
        'repudiandae veniam quaerat... (Tagalog)',
        'ut aspernatur corporis... (Tagalog)',
        'dolore placeat quibusdam... (Tagalog)',
        'dignissimos aperiam dolorem... (Tagalog)',
        'consectetur animi nesciunt... (Tagalog)',
        'quo et expedita modi... (Tagalog)'
      ]
      // replace original content with Tagalog versions only
      const tagalogOnly = response.data.map((p,i) => ({
        ...p,
        title: tagalogTitles[i],
        body: tagalogBodies[i]
      }))
      setPosts(tagalogOnly)
    } catch (err) {
      setError('Failed to fetch posts. Please try again.')
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle POST - Create new post
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setSubmitting(true)
      toast.loading('Submitting post...')
      
      const response = await axios.post(`${API_BASE_URL}/posts`, {
        title: formData.title,
        body: formData.body,
        userId: 1
      })
      
      // Add new post to the beginning of the list
      const newPost = { ...response.data, isNew: true }
      setPosts(prev => [newPost, ...prev])
      setFormData({ title: '', body: '' })
      
      toast.dismiss()
      await alertSuccess('Post created successfully!')
    } catch (err) {
      toast.dismiss()
      await alertError('Failed to create post')
    } finally {
      setSubmitting(false)
    }
  }

  // Handle PUT - Update post
  const handleUpdate = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setUpdating(true)
      toast.loading('Updating post...')
      
      const response = await axios.put(
        `${API_BASE_URL}/posts/${editingId}`,
        {
          title: formData.title,
          body: formData.body,
          userId: 1
        }
      )
      
      // Update post in the list
      setPosts(prev =>
        prev.map(post =>
          post.id === editingId
            ? { ...post, title: response.data.title, body: response.data.body }
            : post
        )
      )
      
      setFormData({ title: '', body: '' })
      setEditingId(null)
      
      toast.dismiss()
      await alertSuccess('Post updated successfully!')
    } catch (err) {
      toast.dismiss()
      await alertError('Failed to update post')
    } finally {
      setUpdating(false)
    }
  }

  // Handle Edit button - Load post data into form
  const handleEdit = (post) => {
    setEditingId(post.id)
    setFormData({
      title: post.title,
      body: post.body
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ title: '', body: '' })
  }

  // Handle DELETE - Delete post
  const handleDelete = async (id) => {
    const result = await confirmDialog({
      title: 'Delete Post',
      text: 'Are you sure you want to delete this post?',
      icon: 'warning',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) return

    try {
      setDeletingId(id)
      toast.loading('Deleting post...')
      
      await axios.delete(`${API_BASE_URL}/posts/${id}`)
      
      // Remove post from the list
      setPosts(prev => prev.filter(post => post.id !== id))
      
      toast.dismiss()
      await alertSuccess('Post deleted successfully!')
    } catch (err) {
      toast.dismiss()
      await alertError('Failed to delete post')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="page-container">
      <Toaster position="top-right" />
      
      <h2>API Practice - CRUD Operations</h2>

      {/* Loading State */}
      {loading && (
        <Alert variant="info" className="text-center">
          <Spinner animation="border" className="me-2" />
          <strong>Loading posts...</strong>
        </Alert>
      )}

      {/* Error State */}
      {error && !loading && (
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" size="sm" onClick={fetchPosts}>
            Retry
          </Button>
        </Alert>
      )}

      {/* Form Section */}
      {!loading && (
        <div className="form-section">
          <h3>{editingId ? 'Edit Post' : 'Create New Post'}</h3>
          <Form onSubmit={editingId ? handleUpdate : handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter post title"
                disabled={submitting || updating}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Body:</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                value={formData.body}
                onChange={handleFormChange}
                placeholder="Enter post content"
                rows={4}
                disabled={submitting || updating}
              />
            </Form.Group>

            <div className="button-group gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={submitting || updating}
              >
                {editingId ? (updating ? 'Updating...' : 'Update') : (submitting ? 'Submitting...' : 'Submit')}
              </Button>
              {editingId && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={submitting || updating}
                >
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </div>
      )}

      {/* Posts Table */}
      {!loading && !error && posts.length > 0 && (
        <div className="table-section">
          <h3>Posts List</h3>
          <div className="table-responsive">
            <Table striped bordered hover className="posts-table">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '5%' }}>ID</th>
                  <th style={{ width: '25%' }}>Title</th>
                  <th style={{ width: '55%' }}>Body</th>
                  <th style={{ width: '15%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td className="fw-bold">{post.title}</td>
                    <td>{post.body}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleEdit(post)}
                          disabled={deletingId === post.id}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                        >
                          {deletingId === post.id ? 'Delete...' : 'Delete'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <Alert variant="warning" className="text-center">
          <strong>No posts available</strong><br />
          Create one to get started!
        </Alert>
      )}
    </div>
  )
}
