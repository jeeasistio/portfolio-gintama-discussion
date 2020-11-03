import Link from 'next/link'

const PleaseLogin = ({ permission }) => {
  return (
    <div className="text-center my-2">
      <small className="font-weight-bold">
        Please <Link href="/auth/login"><a>login</a></Link> to {permission}
      </small>
    </div>
  ) 
}

export default PleaseLogin;