---
title: 'Navbar Styles'
date: 'September 22, 2022'
excerpt: 'Good starting header content stylings'
cover_image: ''
category: 'Styles'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---



# CSS

```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  color: #333;
  height: 60px;
  padding: 0 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header a {
  color: #333;
  margin-right: 20px;
}

.header a:hover {
  color: #000;
}

.header ul {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
}

.logo {
  color: rgb(216, 0, 0);
  font-size: 20px;
  text-transform: uppercase;
}

.logo a {
  color: rgb(216, 0, 0);
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
  }

  .header ul {
    margin: 20px 0;
    flex-direction: column;
    text-align: center;
  }

  .header a {
    margin-right: 0;
  }

  .logo {
    margin: 20px 0;
  }
}
```

# html

```html
<header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Well Run Tournaments</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            // If logged in
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className='btn-secondary btn-icon'
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
```