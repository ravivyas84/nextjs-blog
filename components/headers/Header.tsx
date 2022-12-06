
export default function Header() {
  return (
  <div className="persona">
      <span className="site-title"><a href="/">Ravi Vyas </a></span>
      <span className="site-description">Musings of a Learner</span>
      <div className="nav">
      <strong>&#123;</strong>
      <a className="nav-item" href="/posts/">All Blogs</a> |
      <a className="nav-item" href="/videos/">Videos</a> |
      <a className="nav-item" target="_blank" rel="noopener noreferrer" href="https://multiplelenses.com/">Multiple Lenses</a> |
      <a className="nav-item" target="_blank" rel="noopener noreferrer" href="https://ihatemyspreadsheet.com/">❤️ Spreadsheets</a> 
      <strong>&#125;</strong>
      </div>
  </div>)
}