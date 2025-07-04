// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header com scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// Navegação suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Slider de depoimentos
let currentSlide = 0;
const slides = document.querySelectorAll('.depoimento-card');
const dots = document.querySelectorAll('.nav-dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Event listeners para os dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play do slider
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Mudar slide a cada 6 segundos (mais tempo para ler os depoimentos)
setInterval(nextSlide, 6000);

// Formulário de contato
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!data.nome || !data.email || !data.telefone || !data.servico) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simular envio (em um projeto real, aqui seria uma requisição AJAX)
    alert('Obrigada pelo contato! Entraremos em contato em breve para agendar sua consulta.');
    
    // Limpar formulário
    this.reset();
});

// Animação de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.servico-card, .feature, .contato-item');
    animateElements.forEach(el => observer.observe(el));
});

// Menu ativo baseado na seção visível
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Efeito de digitação no título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Validação de telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        if (value.length > 0) {
            if (value.length <= 2) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 10) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            } else {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            }
        }
        
        e.target.value = value;
    });
}

// Loading da página
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth scroll para botões
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Tooltip para informações de contato
document.querySelectorAll('.contato-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Contador de caracteres para mensagem
const mensagemTextarea = document.getElementById('mensagem');
if (mensagemTextarea) {
    const maxLength = 500;
    
    mensagemTextarea.addEventListener('input', function() {
        const remaining = maxLength - this.value.length;
        const counter = this.parentNode.querySelector('.char-counter') || 
                       document.createElement('div');
        
        if (!this.parentNode.querySelector('.char-counter')) {
            counter.className = 'char-counter';
            counter.style.cssText = 'font-size: 0.8rem; color: #718096; text-align: right; margin-top: 0.5rem;';
            this.parentNode.appendChild(counter);
        }
        
        counter.textContent = `${remaining} caracteres restantes`;
        
        if (remaining < 50) {
            counter.style.color = '#e53e3e';
        } else {
            counter.style.color = '#718096';
        }
    });
}

// Efeito de hover nos cards de serviços
document.querySelectorAll('.servico-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Controles de Áudio
const audioToggle = document.getElementById('audioToggle');
const audioIcon = document.getElementById('audioIcon');
const audioInfo = document.getElementById('audioInfo');
const backgroundAudio = document.getElementById('backgroundAudio');
const audioLoading = document.getElementById('audioLoading');


let isAudioPlaying = false;
let volume = 0.4; // Volume fixo sem controle
let mantraGenerator = null;
let youtubePlayer = null;
let currentAudioSource = 'youtube'; // 'youtube' ou 'synthetic'

// ID do vídeo do YouTube (extraído da URL)
const YOUTUBE_VIDEO_ID = '_QCdn5aLSQE';

// Configurar volume inicial
backgroundAudio.volume = volume;

// Função chamada pela API do YouTube
function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'enablejsapi': 1,
            'fs': 0,
            'iv_load_policy': 3,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'loop': 1,
            'playlist': YOUTUBE_VIDEO_ID
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

// Player do YouTube pronto
function onPlayerReady(event) {
    console.log('YouTube Player pronto');
    event.target.setVolume(volume * 100);
}

// Mudança de estado do player
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        audioIcon.className = 'fas fa-pause';
        audioToggle.classList.add('playing');
        isAudioPlaying = true;
        audioLoading.classList.remove('show');
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        audioIcon.className = 'fas fa-play';
        audioToggle.classList.remove('playing');
        isAudioPlaying = false;
    }
}

// Erro no player do YouTube
function onPlayerError(event) {
    console.log('Erro no YouTube Player:', event.data);
    audioLoading.classList.remove('show');
    // Fallback para mantra sintético
    currentAudioSource = 'synthetic';
    startMantra();
}

// Verificar se o YouTube está disponível após um tempo
setTimeout(() => {
    if (!youtubePlayer) {
        console.log('YouTube Player não carregou, usando mantra sintético');
        currentAudioSource = 'synthetic';
    }
}, 5000);

// Função para alternar áudio
function toggleAudio() {
    if (isAudioPlaying) {
        if (currentAudioSource === 'youtube' && youtubePlayer) {
            youtubePlayer.pauseVideo();
        } else if (mantraGenerator) {
            mantraGenerator.stop();
        } else {
            backgroundAudio.pause();
        }
        audioIcon.className = 'fas fa-play';
        audioToggle.classList.remove('playing');
        isAudioPlaying = false;
    } else {
        // Mostrar loading
        audioLoading.classList.add('show');
        
        if (currentAudioSource === 'youtube' && youtubePlayer) {
            // Reproduzir vídeo do YouTube
            youtubePlayer.playVideo();
        } else {
            // Fallback para mantra sintético
            startMantra();
        }
    }
}

// Função para iniciar mantra
function startMantra() {
    if (!mantraGenerator) {
        mantraGenerator = new MantraGenerator();
    }
    
    if (mantraGenerator.start()) {
        mantraGenerator.setVolume(volume);
        audioIcon.className = 'fas fa-pause';
        audioToggle.classList.add('playing');
        isAudioPlaying = true;
        audioLoading.classList.remove('show');
    } else {
        audioLoading.classList.remove('show');
        alert('Não foi possível iniciar o mantra. Verifique se seu navegador suporta áudio.');
    }
}

// Event listener para botão de áudio
audioToggle.addEventListener('click', toggleAudio);





// Mostrar/ocultar informações de áudio
audioToggle.addEventListener('mouseenter', () => {
    audioInfo.classList.add('show');
});

audioToggle.addEventListener('mouseleave', () => {
    audioInfo.classList.remove('show');
});

// Pausar áudio quando a página não está visível
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isAudioPlaying) {
        if (currentAudioSource === 'youtube' && youtubePlayer) {
            youtubePlayer.pauseVideo();
        } else if (mantraGenerator) {
            mantraGenerator.stop();
        } else {
            backgroundAudio.pause();
        }
        audioIcon.className = 'fas fa-play';
        audioToggle.classList.remove('playing');
        isAudioPlaying = false;
    }
});

// Preloader (opcional)
const preloader = document.createElement('div');
preloader.innerHTML = `
    <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    ">
        <div style="
            text-align: center;
            color: white;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255,255,255,0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            "></div>
            <h3>Carolina Inoue Terapeuta</h3>
            <p>Carregando...</p>
        </div>
    </div>
    <style>
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
`;

document.body.appendChild(preloader);

// Remover preloader após carregamento
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
}); 