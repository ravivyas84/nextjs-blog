import Link from "next/link";

export default function Header() {
  return (
  <div className="persona">
      <span className="site-title"><Link href="/">Ravi Vyas </Link></span>
      <span className="site-description">Musings of a Learner</span>
      <div className="nav">
      <strong>&#123;</strong>
      <Link className="nav-item" href="/posts/">All Blogs</Link> |
      <Link className="nav-item" href="/videos/">Videos</Link> |
      <Link className="nav-item" target="_blank" rel="noopener noreferrer" href="https://multiplelenses.com/">Multiple Lenses</Link> |
      <Link className="nav-item" target="_blank" rel="noopener noreferrer" href="https://ihatemyspreadsheet.com/">❤️ Spreadsheets</Link> 
      <strong>&#125;</strong>
      </div>
  </div>)
}