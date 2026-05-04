import { blogs } from '@/lib/blogs'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export async function generateStaticParams() {
  return blogs.map(blog => ({
    slug: blog.slug
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find(b => b.slug === slug)
  return {
    title: blog
      ? `${blog.title} | AS Micro & Path Labs`
      : 'Blog | AS Micro & Path Labs',
    description: blog?.excerpt || ''
  }
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const blog = blogs.find(b => b.slug === slug)

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-4">
            Blog Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The blog you are looking for does not exist.
          </p>
          <Link href="/#about" className="bg-[#b91c1c] text-white px-6 py-3 rounded-lg font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8fafc] pt-24 pb-16">

        {/* HERO IMAGE */}
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* BLOG CONTENT CONTAINER */}
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">

          {/* Back Link */}
          <Link href="/#about" className="text-[#b91c1c] text-sm font-medium hover:underline inline-flex items-center gap-1 mb-6">
            ← Back to Blogs
          </Link>

          {/* Category Badge */}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-[#f0fafa] text-[#2d9e8f] border border-[#2d9e8f]">
            {blog.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] leading-tight mb-4">
            {blog.title}
          </h1>

          {/* Author + Date + Read Time */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 border-b border-gray-200 pb-6">
            <span>{blog.author}</span>
            <span>·</span>
            <span>{blog.date}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>

          {/* DYNAMIC CONTENT BLOCKS */}
          {blog.content.map((block, index) => {
            if (block.type === "intro") return (
              <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6 font-medium border-l-4 border-[#2d9e8f] pl-4 bg-[#f0fafa] py-3 rounded-r-lg">
                {block.text}
              </p>
            )
            if (block.type === "heading") return (
              <h2 key={index} className="text-xl md:text-2xl font-bold text-[#1a1a2e] mt-8 mb-3">
                {block.text}
              </h2>
            )
            if (block.type === "paragraph") return (
              <p key={index} className="text-gray-600 leading-relaxed mb-4">
                {block.text}
              </p>
            )
            if (block.type === "list") return (
              <ul key={index} className="space-y-2 mb-6 ml-2">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="text-[#2d9e8f] font-bold mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            )
            if (block.type === "cta") return (
              <div key={index} className="mt-10 bg-[#1a1a2e] rounded-xl p-6 text-center">
                <p className="text-white text-base mb-4 leading-relaxed">
                  {block.text}
                </p>
                <Link href="/#appointment" className="inline-block bg-[#b91c1c] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#991b1b] transition-colors duration-200">
                  Book This Test Now
                </Link>
              </div>
            )
            return null
          })}

          {/* RELATED BLOGS */}
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h3 className="text-xl font-bold text-[#1a1a2e] mb-6">
              More Health Insights
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {blogs
                .filter(b => b.slug !== blog.slug)
                .slice(0, 3)
                .map(related => (
                  <Link key={related.id} href={`/blog/${related.slug}`} className="flex gap-4 items-start group bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <img
                      src={related.thumbnail}
                      alt={related.title}
                      className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <span className="text-xs text-[#2d9e8f] font-semibold">
                        {related.category}
                      </span>
                      <p className="text-sm font-bold text-[#1a1a2e] group-hover:text-[#b91c1c] transition-colors line-clamp-2 mt-1">
                        {related.title}
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {related.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
