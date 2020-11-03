module.exports = {
  env: {
    JWT_SECRET: 'jeeasistio', 
    MONGO_URI: 'mongodb+srv://jeeasistio:wpjee09212328342@cluster0.et8sn.mongodb.net/gddb?retryWrites=true&w=majority'
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/global-thread',
        permanent: true
      },
    ]
  },
}