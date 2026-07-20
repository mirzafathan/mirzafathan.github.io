document.addEventListener('DOMContentLoaded', () => {
    // 1. Render all the posts from data.js
    renderPosts();

    // 2. Attach click events to the navigation buttons safely
    const buttons = document.querySelectorAll('.theme-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const themeId = e.target.getAttribute('data-theme');
            showTheme(themeId, e.target);
        });
    });
});

function showTheme(themeId, clickedBtn) {
    // Hide all sections and remove active states
    document.querySelectorAll('.theme-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show the target section and highlight the button
    const targetSection = document.getElementById(themeId);
    if (targetSection) {
        targetSection.classList.add('active');
        clickedBtn.classList.add('active');
    }
}

function renderPosts() {
    // Check if portfolioData exists from data.js
    if (typeof portfolioData === 'undefined') {
        console.error("portfolioData is missing. Ensure data.js is loaded correctly.");
        return;
    }

    for (const [themeId, urls] of Object.entries(portfolioData)) {
        const section = document.getElementById(themeId);
        if (!section) continue;

        const feedContainer = section.querySelector('.feed-container');
        if (!feedContainer) continue;
        
        feedContainer.innerHTML = ''; // Clear out previous content

        if (urls.length === 0) {
            feedContainer.innerHTML = '<p class="placeholder">Posts coming soon.</p>';
            continue;
        }

        urls.forEach(url => {
            const div = document.createElement('div');
            div.className = 'post-container';

            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.height = "500";
            iframe.width = "100%";
            iframe.frameBorder = "0";
            iframe.setAttribute("allowfullscreen", "");
            iframe.title = "LinkedIn Embedded Post";
            iframe.loading = "lazy"; // Prevents lag on initial page load

            div.appendChild(iframe);
            feedContainer.appendChild(div);
        });
    }
}
