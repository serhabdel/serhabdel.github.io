const fs = require('fs');
const path = require('path');

const navTemplate = `    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-logo">
            <a href="../index.html">Abdelhalim Serhani</a>
        </div>
        <ul class="nav-links">
            <li><a href="../index.html" data-i18n="nav.home">Accueil</a></li>
            <li><a href="academic.html" data-i18n="nav.academic">Formation</a></li>
            <li><a href="experience.html" data-i18n="nav.experience">Expérience</a></li>
            <li><a href="skills.html" data-i18n="nav.skills">Compétences</a></li>
            <li><a href="projects.html" data-i18n="nav.projects">Projets</a></li>
            <li><a href="certifications.html" data-i18n="nav.certifications">Certifications</a></li>
            <li><a href="courses.html" data-i18n="nav.courses">Cours</a></li>
            <li><a href="contact.html" data-i18n="nav.contact">Contact</a></li>
        </ul>
        <div class="nav-controls">
            <button id="themeToggle" class="theme-toggle" aria-label="Toggle dark mode">
                <i class="fas fa-moon"></i>
            </button>
            <!-- Language switcher will be inserted here by JavaScript -->
            <button class="hamburger" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>`;

const pagesDir = path.join(__dirname, '..', 'pages');
const pages = [
    'academic.html',
    'certifications.html',
    'contact.html',
    'courses.html',
    'experience.html',
    'projects.html',
    'skills.html'
];

pages.forEach(page => {
    const filePath = path.join(pagesDir, page);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace existing navigation
    content = content.replace(
        /<!-- Navigation -->[\s\S]*?<\/nav>/,
        navTemplate
    );
    
    // Set active class for current page
    content = content.replace(
        `href="${page}" class="active"`,
        `href="${page}"`
    ).replace(
        `href="${page}"`,
        `href="${page}" class="active"`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${page}`);
});

// Update index.html navigation
const indexPath = path.join(__dirname, '..', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

const indexNavTemplate = navTemplate.replace('../', '');
indexContent = indexContent.replace(
    /<!-- Navigation -->[\s\S]*?<\/nav>/,
    indexNavTemplate
);

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('Updated index.html');
