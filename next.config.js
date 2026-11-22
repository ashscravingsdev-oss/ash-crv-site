const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // The events page used to live at /catering; keep old links working.
  async redirects() {
    return [
      { source: '/catering', destination: '/events', permanent: false },
      { source: '/how-it-works', destination: '/faq', permanent: true },
    ]
  },
}

module.exports = nextConfig