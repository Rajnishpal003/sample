import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import { Inter } from 'next/font/google'
import BootstrapClient from '../components/BootstrapClient'
import { TRPCProvider } from '../components/trpc-provider' // ✅ make sure this path is correct

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zoro.Ai',
  description: 'Created by Rajnish Pal Singh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>
          {children}
        </TRPCProvider>
        <BootstrapClient />
      </body>
    </html>
  )
}
