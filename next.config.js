let consolewarn = console.warn
console.warn = (...args) => {
    if (args.length > 1 && args[1].startsWith("You should not access 'res' after getServerSideProps")) {
        // ignore message until this is fixed: https://github.com/auth0/nextjs-auth0/issues/524
    } else {
        consolewarn(...args)
    }
}

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