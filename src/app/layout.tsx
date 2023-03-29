import "./globals.css"

type LayoutProps = {
  children: React.ReactNode
  params: any
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}
