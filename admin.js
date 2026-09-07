const token = localStorage.getItem('adminToken');
if (!token) {
  window.location.href = '/login';
}

function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = '/login';
}

// Profile Save
document.getElementById('profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    fullName: document.getElementById('prof-name').value,
    title: document.getElementById('prof-title').value,
    bio: document.getElementById('prof-bio').value,
    avatarUrl: document.getElementById('prof-avatar').value,
    telegramUrl: document.getElementById('prof-tg').value,
    githubUrl: document.getElementById('prof-gh').value,
    skills: document.getElementById('prof-skills').value.split(',').map(s => s.trim()).filter(Boolean),
    stats: {
      projectsCount: Number(document.getElementById('prof-stat-proj').value),
      experienceYears: Number(document.getElementById('prof-stat-exp').value),
      satisfiedClients: Number(document.getElementById('prof-stat-cli').value)
    }
  };

  const res = await fetch('/api/admin/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(body)
  });

  if (res.ok) alert('Profil yangilandi!');
  else alert('Xatolik yuz berdi!');
});

// Project Add
document.getElementById('project-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    title: document.getElementById('proj-title').value,
    category: document.getElementById('proj-category').value,
    description: document.getElementById('proj-desc').value,
    imageUrl: document.getElementById('proj-image').value,
    liveDemoUrl: document.getElementById('proj-demo').value,
    githubUrl: document.getElementById('proj-github').value,
    tags: document.getElementById('proj-tags').value.split(',').map(s => s.trim()).filter(Boolean)
  };

  const res = await fetch('/api/admin/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    alert('Loyiha qo‘shildi!');
    e.target.reset();
  } else alert('Xatolik!');
});

// Achievement Add
document.getElementById('achievement-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    title: document.getElementById('ach-title').value,
    date: document.getElementById('ach-date').value,
    icon: document.getElementById('ach-icon').value,
    description: document.getElementById('ach-desc').value
  };

  const res = await fetch('/api/admin/achievements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    alert('Natija qo‘shildi!');
    e.target.reset();
  } else alert('Xatolik!');
});
