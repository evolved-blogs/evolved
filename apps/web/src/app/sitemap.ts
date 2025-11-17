import { MetadataRoute } from 'next'

interface BlogPost {
  slug: string;
  updatedAt?: string;
  title?: string;
}
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://evolved.blog' // Replace with your actual domain
  const currentDate = new Date()
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profile/view`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/create-blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic blog routes
  try {
    // Fetch blogs from your API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (response.ok) {
      const blogs: BlogPost[] = await response.json()
      
      const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: BlogPost) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
      
      return [...staticRoutes, ...blogRoutes]
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error)
  }

  // Return static routes if blog fetch fails
  return staticRoutes
}
