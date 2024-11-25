import Link from "next/Link"
import Layout from "../Components/Layout/Layout"

import './global.css'

export const metadata = {
  title: 'NOC Red Movil',
  description: 'Pagina del NOC desarrollado por Eduardo Espinoza',
  icons: {
    icon:['/favicon.png?v=4']
  }
}

export default function RootLayout({ children }) {

  

 return (
    <html lang="es">
      <body className="font-sans h-screen">    
        <Layout>
          <div className="w-full h-full overflow-y-scroll overflow-x-hidden">
            {children}
          </div>
        </Layout>
      </body>
    </html>
  )
}
