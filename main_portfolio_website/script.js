// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else {
  root.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

const galleryData = [
  { id: 1, type: 'image', src: 'assets/705969019_17975900409031953_952509664144437617_n.webp', link: 'https://www.instagram.com/p/DYwmDWMlIbB/', likes: 721, comments: 19 },
  { id: 2, type: 'image', src: 'assets/706629146_17975900427031953_6305284069408670403_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 387, comments: 64 },
  { id: 3, type: 'image', src: 'assets/707421430_17975900436031953_7350767925149927150_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 162, comments: 43 },
  { id: 4, type: 'image', src: 'assets/707826898_17975900418031953_4678570204504850335_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 924, comments: 39 },
  { id: 5, type: 'image', src: 'assets/716010113_17977334352031953_243620711673238642_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 525, comments: 57 },
  { id: 6, type: 'image', src: 'assets/716530797_17977334334031953_5998082533630159352_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 218, comments: 94 },
  { id: 7, type: 'image', src: 'assets/729889293_17981034711031953_2097197063479599326_n.jpg', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 218, comments: 55 },
  { id: 8, type: 'image', src: 'assets/730018588_17981034705031953_3111802760980135046_n.jpg', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 679, comments: 6 },
  { id: 9, type: 'image', src: 'assets/730163290_17981034720031953_6929216384975361526_n.jpg', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 463, comments: 78 },
  { id: 10, type: 'image', src: 'assets/731808159_17981034663031953_7763728678289201070_n.jpg', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 312, comments: 38 },
  { id: 11, type: 'image', src: 'assets/770427783_17987444964031953_2779950796645018204_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 423, comments: 23 },
  { id: 12, type: 'image', src: 'assets/770962926_17987445012031953_2392446903101695213_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 134, comments: 52 },
  { id: 13, type: 'image', src: 'assets/771453938_17987445105031953_4939987668679410859_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 907, comments: 13 },
  { id: 14, type: 'image', src: 'assets/771512258_17987444961031953_8278161703220243301_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 194, comments: 31 },
  { id: 15, type: 'image', src: 'assets/771757341_17987444994031953_5412227785175092010_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 794, comments: 90 },
  { id: 16, type: 'image', src: 'assets/771808948_17987445003031953_4243880429496903501_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 181, comments: 44 },
  { id: 17, type: 'image', src: 'assets/771893508_17987445114031953_5549000975583438960_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 684, comments: 90 },
  { id: 18, type: 'image', src: 'assets/771940663_17987445060031953_469061478858732376_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 744, comments: 52 },
  { id: 19, type: 'image', src: 'assets/772021543_17987445033031953_8750793104658386229_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 579, comments: 22 },
  { id: 20, type: 'image', src: 'assets/772305704_17987445078031953_3648229427718729724_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 324, comments: 13 },
  { id: 21, type: 'image', src: 'assets/772440598_17987445087031953_6237960344655002583_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 823, comments: 5 },
  { id: 22, type: 'image', src: 'assets/772547410_17987445051031953_3731717134516121341_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 602, comments: 18 },
  { id: 23, type: 'image', src: 'assets/772586074_17987445021031953_6922676553708673841_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 198, comments: 62 },
  { id: 24, type: 'image', src: 'assets/772604508_17987445096031953_7300765353905692635_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 956, comments: 32 },
  { id: 25, type: 'image', src: 'assets/772663698_17987444973031953_2221030869466931151_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 434, comments: 17 },
  { id: 26, type: 'image', src: 'assets/772697002_17987445042031953_4759608448413219632_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 634, comments: 67 },
  { id: 27, type: 'image', src: 'assets/772707881_17987445069031953_958747215794235661_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 739, comments: 49 },
  { id: 28, type: 'image', src: 'assets/773014144_17987444985031953_7450644149724299386_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 274, comments: 59 },
  { id: 29, type: 'image', src: 'assets/797903895_17991282111031953_8403082186414139141_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 814, comments: 96 },
  { id: 30, type: 'image', src: 'assets/798077652_17991282018031953_4207768641038481105_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 561, comments: 21 },
  { id: 31, type: 'image', src: 'assets/798115202_17991282027031953_8921197906407536134_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 924, comments: 11 },
  { id: 32, type: 'image', src: 'assets/798215105_17991282096031953_6746130881143847031_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 483, comments: 51 },
  { id: 33, type: 'image', src: 'assets/798215118_17991282063031953_6389597851729291177_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 258, comments: 76 },
  { id: 34, type: 'image', src: 'assets/798455479_17991282048031953_1224651553914635442_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 724, comments: 95 },
  { id: 35, type: 'image', src: 'assets/798537711_17991282141031953_1595138273585003767_n.webp', link: 'https://www.instagram.com/_anshul.kushwaha1/', likes: 149, comments: 49 },
];

const gridGallery = document.getElementById('gridGallery');

function renderGallery() {
  gridGallery.innerHTML = "";
  galleryData.forEach(post => {
    const item = document.createElement("div");
    item.className = "grid-item";
    
    let html = `<img src="${post.src}" alt="Post image" loading="lazy">`;
    
    html += `
      <div class="grid-overlay">
        <div class="stat">
          <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <span>${post.likes}</span>
        </div>
        <div class="stat">
          <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>${post.comments}</span>
        </div>
      </div>
    `;
    
    item.innerHTML = `
      <a href="${post.link}" target="_blank" style="display: block; width: 100%; height: 100%; text-decoration: none; color: inherit;">
        ${html}
      </a>
    `;
    
    gridGallery.appendChild(item);
  });
}

renderGallery();

setTimeout(() => {
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.transitionDelay = (index % 3) * 0.1 + 's';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => observer.observe(item));

    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".grid-item"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.02
        });
    }
}, 500);

const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    const randomLinks = [
        'https://www.instagram.com/p/DYwmDWMlIbB/',
        'https://www.instagram.com/_anshul.kushwaha1/',
        'https://www.instagram.com/_anshul.kushwaha1/',
        'https://www.instagram.com/_anshul.kushwaha1/',
        'https://www.instagram.com/_anshul.kushwaha1/',
        'https://www.instagram.com/_anshul.kushwaha1/',
        'https://www.instagram.com/_anshul.kushwaha1/'
    ];

    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);

    newSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            const randomUrl = randomLinks[Math.floor(Math.random() * randomLinks.length)];
            this.value = '';
            window.open(randomUrl, '_blank');
        }
    });
}


