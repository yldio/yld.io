import React from 'react'
import PostPreview from '../../components/Blog/PostPreview'
import usePosts from '../../hooks/use-posts'

const Posts = () => {
  const posts = usePosts()

  return (
    <div>
      <h1>Blog Posts:</h1>
      {posts.map(post => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </div>
  )
}

export default Posts
