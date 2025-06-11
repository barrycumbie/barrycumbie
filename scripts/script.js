document.addEventListener("DOMContentLoaded", () => {
  // Document is ready
  console.log("hello console!");
  addExampleBlogEntry();
  setStandardCookie();
  displayUserProfile();
});

function addExampleBlogEntry() {
  const blogEntries = document.getElementById('blog-entries');
  if (blogEntries) {
    const entry = document.createElement('div');
    entry.className = 'blog-entry';
    entry.innerHTML = `
      <h5><i class="bi bi-pencil-square"></i> Example Blog Entry</h5>
      <p>This is an example blog entry added when the page loads.</p>
    `;
    blogEntries.prepend(entry);
  }
}

function setStandardCookie() {
  const d = new Date();
  d.setTime(d.getTime() + (7*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  const userName = encodeURIComponent("John Doe");
  document.cookie = `exampleCookie=${userName}; ${expires}; path=/`;
  console.log("Cookie set:", document.cookie);
}

function getUserNameFromCookie() {
  const match = document.cookie.match(/exampleCookie=([^;]+)/);
  if (match) {
    const decoded = decodeURIComponent(match[1]);
    console.log("User name from cookie:", decoded);
    return decoded;
  }
  console.log("User name not found in cookie.");
  return null;
}

function displayUserProfile() {
  const userName = getUserNameFromCookie();
  console.log("user name:", userName)
  // Find the login nav link by its icon class
  const loginNav = document.querySelector('.navbar-nav .nav-link .bi-box-arrow-in-right')?.parentElement;
  if (loginNav) {
    if (userName) {
      // Show initials and user icon instead of "Login"
      const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
      loginNav.innerHTML = `
        <i class="bi bi-person-circle me-1"></i>
        <span class="fw-bold">${initials}</span>
      `;
      loginNav.title = userName;
    } else {
      // Default login link
      loginNav.innerHTML = `
        <i class="bi bi-box-arrow-in-right me-1"></i>
        <span>Login</span>
      `;
      loginNav.title = "Login";
    }
  }
  // Optionally update a user-profile div elsewhere
  const userProfileDiv = document.getElementById('user-profile');
  if (userProfileDiv) {
    if (userName) {
      userProfileDiv.innerHTML = `<p>Welcome back, ${userName}!</p>`;
    } else {
      userProfileDiv.innerHTML = `<p>Welcome, guest!</p>`;
    }
  }
}


