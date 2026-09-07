document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/public/data');
    const data = await res.json();

    const { profile, projects, achievements } = data;

    // Load Profile
    if (profile) {
      document.getElementById('header-name').innerText = profile.fullName || 'Portfolio';
      document.getElementById('profile-name').innerText = profile.fullName || 'Dasturchi';
      document.getElementById('profile-title').innerText = profile.title || '';
      document.getElementById('profile-bio').innerText = profile.bio || '';
      document.getElementById('profile-avatar').src = profile.avatarUrl || 'https://via.placeholder.com/150';
      
      document.getElementById('link-telegram').href = profile.telegramUrl || '#';
      document.getElementById('link-github').href = profile.githubUrl || '#';

      if (profile.stats) {
        document.getElementById('stat-projects').innerText = profile.stats.projectsCount || 0;
        document.getElementById('stat-experience').innerText = profile.stats.experienceYears || 0;
        document.getElementById('stat-clients').innerText = profile.stats.satisfiedClients || 0;
      }

      const skillsContainer = document.getElementById('profile-skills');
      skillsContainer.innerHTML = (profile.skills || []).map(skill => 
        `<span class="bg-slate-700/60 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-600/40">${skill}</span>`
      ).join('');
    }

    // Load Projects
    const projectsContainer = document.getElementById('projects-list');
    if (projects && projects.length > 0) {
      projectsContainer.innerHTML = projects.map(proj => `
        <div class="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-600 transition">
          <div>
            <img src="${proj.imageUrl}" alt="${proj.title}" class="w-full h-48 object-cover">
            <div class="p-5 space-y-3">
              <div class="flex justify-between items-start">
                <h4 class="font-bold text-lg text-white">${proj.title}</h4>
                <span class="text-xs bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded border border-teal-500/20">${proj.category}</span>
              </div>
              <p class="text-slate-300 text-sm leading-relaxed">${proj.description}</p>
              <div class="flex flex-wrap gap-1.5 pt-2">
                ${(proj.tags || []).map(t => `<span class="text-[11px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded">${t}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="p-5 pt-0 flex gap-4 text-xs font-medium">
            ${proj.liveDemoUrl ? `<a href="${proj.liveDemoUrl}" target="_blank" class="text-teal-400 hover:underline">Live Demo ↗</a>` : ''}
            ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="text-slate-400 hover:underline">GitHub Code ↗</a>` : ''}
          </div>
        </div>
      `).join('');
    } else {
      projectsContainer.innerHTML = '<p class="text-slate-500 text-sm">Hozircha loyihalar mavjud emas.</p>';
    }

    // Load Achievements
    const achievementsContainer = document.getElementById('achievements-list');
    if (achievements && achievements.length > 0) {
      achievementsContainer.innerHTML = achievements.map(ach => `
        <div class="bg-slate-800/30 border border-slate-700/40 p-4 rounded-xl flex items-start gap-4">
          <div class="text-2xl">${ach.icon || '🏆'}</div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-white text-sm">${ach.title}</h4>
              <span class="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">${ach.date}</span>
            </div>
            <p class="text-slate-300 text-xs mt-1">${ach.description}</p>
          </div>
        </div>
      `).join('');
    } else {
      achievementsContainer.innerHTML = '<p class="text-slate-500 text-sm">Hozircha natijalar mavjud emas.</p>';
    }

  } catch (err) {
    console.error('Data loading error:', err);
  }
});

function exportPortfolioAsPNG() {
  const element = document.getElementById('exportable-area');
  html2canvas(element, { backgroundColor: '#0f172a' }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'my-portfolio-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}
