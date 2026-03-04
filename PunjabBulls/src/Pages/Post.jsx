import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
// import SinglePostPage from '../components/Blog/SinglePostPage'

export default function Post() {
  const { slug } = useParams()
  const navigate = useNavigate()

  return (
    <Layout>
      <SinglePostPage
        slug={slug}
        onBack={() => navigate('/blog')}
      />
    </Layout>
  )
}