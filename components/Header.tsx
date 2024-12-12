import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children }: HeaderProps) => {
  console.log(`HII - ${children} v`)
  return (
    <div className='header'>
      <Link href="/" className='md:flex-1'>
        <Image src="/assets/icons/logo.svg" alt='Logo' width={120} height={32} className='hidden md:block' priority  />
        <Image src="/assets/icons/logo-icon.svg" alt='Logo' width={32} height={32} className='mr-2 md:hidden' priority  />
      </Link>
      {children}
    </div>
  )
}

export default Header   