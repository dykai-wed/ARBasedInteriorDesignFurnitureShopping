// Sample tool data
const tools = [
  {
    id: '1',
    name: 'VidAI Magic',
    description: 'AI-powered video editing for creators.',
    logoUrl: 'https://placehold.co/200x80?text=Tool+Logo',
    category: 'Video Editing',
    tags: ['video', 'editing', 'ai'],
    rating: 4.7,
    youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: ['https://placehold.co/300x150?text=Screenshot'],
    reviews: [
      { user: 'Alice', text: 'Amazing tool!', rating: 5 },
      { user: 'Bob', text: 'Very helpful for editing.', rating: 4 }
    ],
    url: 'https://example.com',
    verified: true
  },
  {
    id: '2',
    name: 'ScriptGenie',
    description: 'Generate scripts for your videos in seconds.',
    logoUrl: 'https://placehold.co/200x80?text=Tool+Logo',
    category: 'Script Writing',
    tags: ['script', 'writing', 'ai'],
    rating: 4.5,
    youtube: 'https://www.youtube.com/embed/9bZkp7q19f0',
    screenshots: ['https://placehold.co/300x150?text=Screenshot'],
    reviews: [
      { user: 'Jane', text: 'Very creative!', rating: 5 }
    ],
    url: 'https://example.com',
    verified: false
  }
];

// Utility to get query params
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// --- FAVORITES FEATURE ---
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}
function toggleFavorite(id) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(fid => fid !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favs));
  renderToolsPage();
  renderToolDetailPage();
  renderFavoritesPage();
}
function renderFavoritesPage() {
  const grid = document.getElementById('favoritesGrid');
  if (!grid) return;
  const favs = getFavorites();
  const favTools = tools.filter(t => favs.includes(t.id));
  grid.innerHTML = favTools.length ? favTools.map(tool => `
    <div class="col-md-6 mb-4">
      <div class="card h-100">
        <div class="row g-0 align-items-center">
          <div class="col-4 text-center">
            <img src="${tool.logoUrl}" class="img-fluid p-2" style="max-height:80px;object-fit:contain" alt="${tool.name}" />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title mb-1">${tool.name}</h5>
              <p class="card-text small mb-2">${tool.description}</p>
              <div class="mb-2">
                ${tool.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-warning">
                  <i class="bi bi-star-fill"></i> ${tool.rating}
                </span>
                <a href="tool.html?id=${tool.id}" class="btn btn-sm btn-outline-primary">View</a>
                <a href="${tool.url}" class="btn btn-sm btn-primary ms-2" target="_blank" rel="noopener noreferrer">Visit Tool</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('') : '<div class="col-12"><div class="alert alert-info text-center">No favorites yet.</div></div>';
}

// Render tool cards for tools.html
function renderToolsPage() {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;
  let sorted = [...tools];
  const sort = document.getElementById('sortSelect').value;
  if (sort === 'rating') sorted.sort((a,b)=>b.rating-a.rating);
  if (sort === 'name') sorted.sort((a,b)=>a.name.localeCompare(b.name));
  let search = '';
  if (document.getElementById('searchInput')) {
    search = document.getElementById('searchInput').value.trim().toLowerCase();
  }
  if (search) {
    sorted = sorted.filter(tool =>
      tool.name.toLowerCase().includes(search) ||
      tool.category.toLowerCase().includes(search) ||
      tool.tags.some(tag => tag.toLowerCase().includes(search))
    );
  }
  grid.innerHTML = sorted.map(tool => `
    <div class="col-md-6 mb-4">
      <div class="card h-100">
        <div class="row g-0 align-items-center">
          <div class="col-4 text-center">
            <img src="${tool.logoUrl}" class="img-fluid p-2" style="max-height:80px;object-fit:contain" alt="${tool.name}" />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title mb-1">${tool.name}</h5>
              <p class="card-text small mb-2">${tool.description}</p>
              <div class="mb-2">
                ${tool.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-warning">
                  <i class="bi bi-star-fill"></i> ${tool.rating}
                </span>
                <button class="btn btn-sm btn-outline-danger me-1" onclick="toggleFavorite('${tool.id}')">
                  <i class="bi ${getFavorites().includes(tool.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
                </button>
                <a href="tool.html?id=${tool.id}" class="btn btn-sm btn-outline-primary">View</a>
                <a href="${tool.url}" class="btn btn-sm btn-primary ms-2" target="_blank" rel="noopener noreferrer">Visit Tool</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Render tool detail for tool.html
function renderToolDetailPage() {
  const detail = document.getElementById('toolDetail');
  if (!detail) return;
  const id = getQueryParam('id');
  const tool = tools.find(t => t.id === id) || tools[0];
  const favs = getFavorites();
  detail.innerHTML = `
    <div class="row mb-4">
      <div class="col-md-4 text-center">
        <img src="${tool.logoUrl}" alt="${tool.name}" class="img-fluid mb-2" style="max-height:120px" />
        ${tool.verified ? '<span class="badge bg-success mb-2">Verified</span>' : ''}
        <h2>${tool.name}</h2>
        <div class="mb-2">
          ${tool.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
        </div>
        <div class="mb-2 text-warning">
          <i class="bi bi-star-fill"></i> ${tool.rating}
        </div>
        <button class="btn btn-outline-danger w-100 mb-2" onclick="toggleFavorite('${tool.id}')">
          <i class="bi ${favs.includes(tool.id) ? 'bi-heart-fill' : 'bi-heart'}"></i> ${favs.includes(tool.id) ? 'Remove from' : 'Add to'} Favorites
        </button>
        <a href="${tool.url}" class="btn btn-primary w-100 mb-2" target="_blank" rel="noopener noreferrer">Visit Tool</a>
        <button class="btn btn-outline-danger w-100 mb-2" onclick="alert('Thank you for reporting!')">Report Tool</button>
      </div>
      <div class="col-md-8">
        <h4>Description</h4>
        <p>${tool.description}</p>
        <h5 class="mt-4">YouTube Demo</h5>
        <div class="ratio ratio-16x9 mb-3">
          <iframe src="${tool.youtube}" title="YouTube demo" allowfullscreen></iframe>
        </div>
        <h5>Screenshots</h5>
        <div class="d-flex flex-wrap mb-3">
          ${tool.screenshots.map(src => `<img src="${src}" alt="Screenshot" class="img-thumbnail me-2 mb-2" style="max-width:140px" />`).join('')}
        </div>
        <h5>User Reviews</h5>
        <ul class="list-group">
          ${tool.reviews.map(rev => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span>${rev.user}: ${rev.text}</span>
              <span class="text-warning"><i class="bi bi-star-fill"></i> ${rev.rating}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

// --- SEARCH EVENT ---
if (document.getElementById('searchInput')) {
  document.getElementById('searchInput').addEventListener('input', renderToolsPage);
}

// --- FAVORITES PAGE RENDER ---
if (document.getElementById('favoritesGrid')) {
  renderFavoritesPage();
}

// --- NEWSLETTER SIGNUP ---
if (document.getElementById('newsletterForm')) {
  document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('newsletterMsg').textContent = 'Thanks for subscribing!';
    setTimeout(()=>{
      document.getElementById('newsletterMsg').textContent = '';
    }, 3500);
    this.reset();
  });
}

// Handle sorting on tools.html
if (document.getElementById('sortSelect')) {
  document.getElementById('sortSelect').addEventListener('change', renderToolsPage);
  renderToolsPage();
}

// Render tool detail if on tool.html
if (document.getElementById('toolDetail')) {
  renderToolDetailPage();
}

// Handle submit form on submit.html
if (document.getElementById('submitForm')) {
  document.getElementById('submitForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('submitSuccess').classList.remove('d-none');
    this.reset();
    setTimeout(()=>{
      document.getElementById('submitSuccess').classList.add('d-none');
    }, 3500);
  });
}
