module.exports = {
  env: {
    JWT_SECRET: 'jeeasistio', 
    MONGO_URI: 'mongodb+srv://jeeasistio:jeeasistio@cluster0.et8sn.mongodb.net/gddb?retryWrites=true&w=majority'
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/episodes-discussion',
        permanent: true
      },
    ]
  },
}