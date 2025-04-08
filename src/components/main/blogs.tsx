import { Calendar } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

const blogPosts = [
    {
        title: "Spring 2025 Fashion Trends You Need to Know",
        excerpt: "Discover the key pieces and styles that will define this season's fashion landscape.",
        date: "April 2, 2025",
        image: "/api/placeholder/360/240",
        author: "Emma Stevens",
        category: "Style Guide"
    },
    {
        title: "Sustainable Fashion: How to Build an Eco-Friendly Wardrobe",
        excerpt: "Tips for creating a stylish and environmentally conscious closet without compromising on style.",
        date: "March 28, 2025",
        image: "/api/placeholder/360/240",
        author: "Michael Chen",
        category: "Sustainability"
    },
    {
        title: "How to Style One Item Five Different Ways",
        excerpt: "Maximize your wardrobe with these versatile styling techniques for everyday pieces.",
        date: "March 15, 2025",
        image: "/api/placeholder/360/240",
        author: "Sophia Rodriguez",
        category: "Styling Tips"
    }
];


const Blogs = () => {
  return (
      <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                  <div>
                      <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">Style Guide</h2>
                      <p className="text-gray-600">Inspiration, tips, and fashion advice</p>
                  </div>
                  <Button variant="outline" className="mt-4 md:mt-0">
                      Read All Articles
                  </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {blogPosts.map((post, index) => (
                      <Card key={index} className="overflow-hidden h-full flex flex-col">
                          <img
                              src={'https://maxm-imggenurl.web.val.run/' + post.title}
                              alt={post.title}
                              className="w-full h-48 object-cover"
                          />
                          <div className="p-6 flex-grow flex flex-col">
                              <div className="flex justify-between items-center mb-2">
                                  <Badge className="bg-gray-100 text-gray-800 font-normal">{post.category}</Badge>
                                  <div className="flex items-center text-sm text-gray-500">
                                      <Calendar className="h-3 w-3 mr-1" /> {post.date}
                                  </div>
                              </div>
                              <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                              <div className="flex items-center justify-between mt-auto">
                                  <div className="flex items-center">
                                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2">
                                          {post.author.charAt(0)}
                                      </div>
                                      <span className="text-sm">{post.author}</span>
                                  </div>
                                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                                      Read More
                                  </Button>
                              </div>
                          </div>
                      </Card>
                  ))}
              </div>
          </div>
      </section>
  )
}

export default Blogs
