import Image from 'next/image'

import styles from './page.module.css'




export default function Home() {

  return (
    <main className={styles.main}>
     
 <div className={styles.center}>
        <Image
          //className={styles.logo}
          src="/j4data-.png"
          alt="Next.js Logo"
          width={230}
          height={200}
          priority
        />
      </div>

  
     
    </main>
  )
}
