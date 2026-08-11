import React, { useEffect, useState, useRef } from 'react';
import { 
  Rocket, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  Megaphone, 
  Code, 
  Share2, 
  CheckCircle, 
  Mail, 
  Phone, 
  Send,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Users,
  ArrowUp
} from 'lucide-react';

// Bibliotecas GSAP e Lenis para rolagem cinematográfica (Estilo GTA 6)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Registrar o plugin ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

// Importação dos logos oficiais e assets
import logoBuzzMkt from './assets/icone_buzz.png';
import mascoteBuzz from './assets/mascote_buzz.png';
import paletaBuzz from './assets/paleta_buzz.png';

// Importação das partes do Método Colmeia (Fatias do Drive)
import parte12 from './assets/parte_1_2.png';
import parte13 from './assets/parte_1_3.png';
import parte14 from './assets/parte_1_4.png';
import parte15 from './assets/parte_1_5.png';
import parte16 from './assets/parte_1_6.png';
import parte17 from './assets/parte_1_7.png';

// Importação dos Planos (Cards reais de alta definição)
import planoSemente from './assets/plano_semente.jpg';
import planoSafra from './assets/plano_safra.jpg';
import planoColheita from './assets/plano_colheita.jpg';

// Importação dos Diferenciais
import imgIA from './assets/inteligencia_artificial.jpg';
import imgCrm from './assets/crm.jpg';
import imgMarketing from './assets/marketing_estrategico.jpg';

// Importação das fotos reais da CEO/Fundadora
import tahyseCorporate from './assets/tahyse_corporate.jpg';
import tahyseStudio from './assets/tahyse_studio.jpg';
import tahyse1 from './assets/tahyse_1.png';
import tahyse2 from './assets/tahyse_2.png';
import tahyse3 from './assets/tahyse_3.png';
import tahyse4 from './assets/tahyse_4.png';
import tahyse5 from './assets/tahyse_5.png';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeEtapa, setActiveEtapa] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Referências para animações
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroVisualRef = useRef(null);

  const servicesRef = useRef(null);
  const diferenciaisRef = useRef(null);
  const metodoRef = useRef(null);
  const planosRef = useRef(null);
  const quemSomosRef = useRef(null);

  const fotosCEO = [
    tahyse1,
    tahyse2,
    tahyse3,
    tahyse4,
    tahyse5
  ];

  const etapasMetodo = [
    {
      title: "1. Mapeamento Comercial & Paleta",
      desc: "Análise profunda do posicionamento atual e definição da identidade visual premium de conversão utilizando a paleta oficial da Somos Buzz.",
      img: parte12
    },
    {
      title: "2. Desenvolvimento de Atração",
      desc: "Criação de páginas e anúncios sob medida focados na captação inicial de tráfego ultra-qualificado no Google e Meta Ads.",
      img: parte13
    },
    {
      title: "3. Nutrição Inteligente de Leads",
      desc: "Implementação de automações de e-mail e mensageria para aquecer os contatos captados antes do contato comercial.",
      img: parte14
    },
    {
      title: "4. Integração de Processo Comercial",
      desc: "Parametrização completa do CRM com pipelines claros, permitindo o acompanhamento de cada negócio aberto em tempo real.",
      img: parte15
    },
    {
      title: "5. Otimização com Inteligência Artificial",
      desc: "Otimização de tarefas diárias e rotinas comerciais com inteligência artificial para maximizar a performance comercial.",
      img: parte16
    },
    {
      title: "6. Colheita de Resultados & Escala",
      desc: "Análise analítica de performance comercial, relatórios transparentes de ROI e reinvestimento estratégico para escala contínua.",
      img: parte17
    }
  ];

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', faturamento: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [formStep, setFormStep] = useState(1);

  // Carrossel Automático de Fotos da CEO (Tahyse) - Mudança automática a cada 3.5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % fotosCEO.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // GSAP & Lenis Smooth Scroll Setup
  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.6, // Scroll inercial mais lento e premium
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    // 2. TIMELINE HERO (Pin & Scrub)
    const tlHero = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });
    tlHero.to(heroContentRef.current, { opacity: 1, y: 0, duration: 0.1 }, 0); 
    tlHero.to(heroContentRef.current, { opacity: 0, y: -60, duration: 1 }, 0.1);
    tlHero.to(heroVisualRef.current, { opacity: 0, duration: 1 }, 0.1); // Transiciona apenas a opacidade para esmaecer suavemente no scroll
    window.tlHero = tlHero;

    // 3. TIMELINE SOLUÇÕES (Services)
    const tlServices = gsap.timeline({
      scrollTrigger: {
        trigger: servicesRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });
    tlServices.fromTo(".services .section-header", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
    tlServices.fromTo(".services .hexagon-card", { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 1 });

    // 4. TIMELINE DIFERENCIAIS
    const tlDiferenciais = gsap.timeline({
      scrollTrigger: {
        trigger: diferenciaisRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });
    tlDiferenciais.fromTo(".diferenciais .reveal", { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 1 }, 0);
    tlDiferenciais.fromTo(".diferencial-img-wrapper", { opacity: 0, scale: 0.8, rotate: -3 }, { opacity: 1, scale: 1, rotate: 0, duration: 1 }, 0);

    // 5. TIMELINE MÉTODO COLMEIA EM ZIGUE-ZAGUE (REVEAL 3D CINEMATOGRÁFICO DE MONTAGEM)
    gsap.utils.toArray(".metodo-step-row").forEach((row, index) => {
      const visualContainer = row.querySelector(".metodo-step-visual-container");
      const textContainer = row.querySelector(".metodo-step-text");
      const direction = index % 2 === 0 ? 1 : -1;

      gsap.fromTo(visualContainer, 
        { 
          opacity: 0, 
          x: direction * 150, 
          rotate: direction * 25, 
          scale: 0.7,
          transformPerspective: 1000,
          rotateY: direction * 45
        },
        { 
          opacity: 1, 
          x: 0, 
          rotate: 0, 
          scale: 1, 
          rotateY: 0,
          duration: 1,
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            end: "top 45%",
            scrub: 1
          }
        }
      );

      gsap.fromTo(textContainer,
        {
          opacity: 0,
          x: -direction * 100,
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 50%",
            scrub: 1
          }
        }
      );
    });

    // 6. TIMELINE PLANOS EM ZIGUE-ZAGUE (REVEAL GRADATIVO POR SCROLL)
    gsap.utils.toArray(".plano-step-row").forEach((row) => {
      gsap.fromTo(row, 
        { opacity: 0, y: 80, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 50%",
            scrub: 1
          }
        }
      );
    });

    // Animação da Seção do Blog
    gsap.utils.toArray(".blog-card").forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            scrub: 1
          }
        }
      );
    });

    // 7. TIMELINE QUEM SOMOS (CEO Showcase / Mascote)
    const tlQuemSomos = gsap.timeline({
      scrollTrigger: {
        trigger: quemSomosRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });
    tlQuemSomos.fromTo(".gallery-showcase", { opacity: 0, scale: 0.85, x: -50 }, { opacity: 1, scale: 1, x: 0, duration: 1 }, 0);
    tlQuemSomos.fromTo(".quem-somos .dna-content", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1 }, 0);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectBilling = (valor) => {
    setFormData(prev => ({ ...prev, faturamento: valor }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formStep < 3) {
      setFormStep(prev => prev + 1);
      return;
    }
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', faturamento: '' });
      setTimeout(() => {
        setFormStatus('idle');
        setFormStep(1);
      }, 3000);
    }, 1500);
  };

  const nextCEOPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % fotosCEO.length);
  };

  const prevCEOPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + fotosCEO.length) % fotosCEO.length);
  };

  return (
    <>
      {/* Background de Favos Translúcidos de Alta Fidelidade */}
      <div className="honeycomb-grid-bg"></div>

      {/* Partículas de Pólen Flutuando */}
      <div className="polen-particle" style={{ left: '15%', animationDelay: '0s', animationDuration: '14s' }}></div>
      <div className="polen-particle" style={{ left: '35%', animationDelay: '2s', animationDuration: '18s' }}></div>
      <div className="polen-particle" style={{ left: '55%', animationDelay: '4s', animationDuration: '12s' }}></div>
      <div className="polen-particle" style={{ left: '75%', animationDelay: '1s', animationDuration: '16s' }}></div>
      <div className="polen-particle" style={{ left: '85%', animationDelay: '6s', animationDuration: '15s' }}></div>

      {/* HEADER */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
        <div className="container">
          <a href="#home" className="logo">
            <img src={logoBuzzMkt} alt="Somos Buzz Marketing" />
          </a>
          
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} id="nav-menu">
            <li><a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#servicos" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Soluções</a></li>
            <li><a href="#metodo" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Método Colmeia</a></li>
            <li><a href="#planos" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Planos</a></li>
            <li><a href="#blog" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Blog</a></li>
            <li><a href="#quem-somos" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Quem Somos</a></li>
            <li><a href="#contato" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contato</a></li>
          </ul>

          <div className="nav-cta">
            <a href="#contato" className="btn btn-primary">Fale Conosco <ArrowRight size={16} /></a>
          </div>

          <button 
            className="menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* HERO SECTION (CARROSSEL DA CEO EM HEXÁGONO) */}
      <section className="hero" id="home" ref={heroRef}>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content" ref={heroContentRef}>
              <div className="hero-badge">
                <Sparkles size={14} /> Polinização Digital & Escala Comercial Ativa
              </div>
              <h1 className="hero-title">
                Polinizamos marcas para colher <span className="text-gradient-buzz">resultados exponenciais</span>
              </h1>
              <p className="hero-desc">
                Muito além de tráfego pago. Estruturamos a colmeia comercial do seu negócio com processos sólidos, automações inteligentes de IA e design premium projetado em favos de alta fidelidade para maximizar sua colheita.
              </p>
              <div className="hero-btns">
                <a href="#contato" className="btn btn-primary">Fale Conosco <Rocket size={16} /></a>
                <a href="#servicos" className="btn btn-secondary">Explorar Soluções</a>
              </div>
            </div>

            <div className="hero-visual" ref={heroVisualRef} style={{ alignSelf: 'end', display: 'flex', alignItems: 'end', height: '100%', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
              <div className="hero-glow-blob" style={{ bottom: '0' }}></div>
              <img 
                src={fotosCEO[currentPhotoIndex]} 
                alt="CEO Tahyse Somos Buzz" 
                style={{ width: '100%', maxHeight: '780px', objectFit: 'contain', display: 'block', margin: '0', position: 'absolute', bottom: 0 }}
                key={currentPhotoIndex}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO SOLUÇÕES PREMIUM (CARDS HEXAGONAIS) */}
      <section className="services" id="servicos" ref={servicesRef} style={{ height: 'auto', minHeight: 'auto', padding: '8rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Soluções Premium</span>
            <h2 className="section-title">Aceleradores de Escala Comercial</h2>
            <p className="section-desc">Criamos engrenagens digitais focadas em estruturação comercial e marketing estratégico.</p>
          </div>

          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', marginTop: '4rem' }}>
            <div className="hexagon-card service-card">
              <Megaphone size={34} className="text-gradient-buzz" style={{ marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#ffffff' }}>Marketing Estratégico</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>Planejamento multicanal baseado em dados e posicionamento premium para destacar sua marca no mercado.</p>
            </div>

            <div className="hexagon-card service-card">
              <Zap size={34} className="text-gradient-buzz" style={{ marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#ffffff' }}>Inteligência Artificial</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>Otimização de rotinas e processos com IA, criando fluxos ágeis que maximizam a performance comercial.</p>
            </div>

            <div className="hexagon-card service-card">
              <Users size={34} className="text-gradient-buzz" style={{ marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#ffffff' }}>CRM & Comercial</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>Integração de ferramentas de gestão de leads (CRMs) com pipelines claros para sua equipe focar em fechamentos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO NOSSO DIFERENCIAL & PALETA DE CORES */}
      <section className="diferenciais" id="diferenciais" ref={diferenciaisRef} style={{ background: 'var(--bg-secondary)' }}>
        <div className="honeycomb-pattern" style={{ opacity: 0.02 }}></div>
        <div className="container">
          <div className="diferencial-card-grid">
            <div className="reveal">
              <span className="section-tag">Diferencial & Identidade</span>
              <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '2rem' }}>
                Design de Alta Conversão & Cores Oficiais
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                Não criamos apenas sites. Desenvolvemos ecossistemas visuais baseados na psicologia das cores oficiais da **Somos Buzz**, desenhadas para transmitir autoridade, inovação e gerar confiança instantânea nos visitantes do seu negócio.
              </p>
              <div className="dna-features">
                <div className="dna-feature-item"><CheckCircle size={18} className="text-gradient-buzz" /> Amarelo Ouro: Conversão e Energia</div>
                <div className="dna-feature-item"><CheckCircle size={18} className="text-gradient-buzz" /> Laranja Buzz: Ação e Tecnologia</div>
                <div className="dna-feature-item"><CheckCircle size={18} className="text-gradient-buzz" /> Estrutura Hexagonal Fluida</div>
              </div>
            </div>

            <div className="diferencial-img-wrapper">
              <img src={paletaBuzz} alt="Paleta de Cores Somos Buzz" style={{ padding: '2rem', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO MÉTODO COLMEIA INTERATIVO (ZIGUE-ZAGUE TIMELINE) */}
      <section className="metodo" id="metodo" ref={metodoRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Metodologia Exclusiva</span>
            <h2 className="section-title">O Método Colmeia</h2>
            <p className="section-desc">Nosso processo refinado de escala comercial estruturado em favos que se conectam em zigue-zague.</p>
          </div>

          <div className="metodo-timeline">
            {etapasMetodo.map((etapa, idx) => (
              <div className="metodo-step-row" key={idx}>
                {/* Visual / Favo de Mel */}
                <div className="metodo-step-visual">
                  <div className="metodo-step-visual-container">
                    <img 
                      src={etapa.img} 
                      alt={etapa.title} 
                    />
                  </div>
                </div>

                {/* Texto Explicativo */}
                <div className="metodo-step-text">
                  <span className="section-tag" style={{ fontSize: '0.75rem' }}>Fase {idx + 1}</span>
                  <h3>{etapa.title}</h3>
                  <p>{etapa.desc}</p>
                  <div className="dna-features">
                    <div className="dna-feature-item" style={{ fontFamily: 'var(--font-title)', fontWeight: 700 }}>
                      <CheckCircle size={18} className="text-gradient-buzz" /> Métricas e KPI Acompanhados
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO PLANOS DE CRESCIMENTO (ZIGUE-ZAGUE TIMELINE) */}
      <section className="portfolio" id="planos" ref={planosRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Modelos de Escala</span>
            <h2 className="section-title">Estratégias de Crescimento</h2>
            <p className="section-desc">Estruturas desenhadas para cada fase do seu negócio atingir a máxima colheita de resultados.</p>
          </div>

          <div className="metodo-timeline">
            {/* Plano Semente */}
            <div className="plano-step-row reveal">
              <div className="plano-step-visual">
                <div className="plano-step-visual-container">
                  <img src={planoSemente} alt="Plano Semente" />
                </div>
              </div>
              <div className="plano-step-text">
                <span className="section-tag" style={{ fontSize: '0.75rem' }}>Fase Inicial</span>
                <h3>Plano Semente</h3>
                <p>Ideal para estruturação e primeiros passos consistentes em tráfego de alta conversão.</p>
                <ul className="modal-list" style={{ margin: '0 0 2rem 0' }}>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Configuração profissional de contas no Google Ads e Meta Ads.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Desenvolvimento de 1 Landing Page ultra-veloz de alta conversão.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Relatório analítico básico de captação mensal de leads.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Suporte dedicado via WhatsApp em horário comercial.</li>
                </ul>
                <a href="#contato" className="btn btn-primary" style={{ width: 'fit-content' }}>Contratar Plano Semente <ArrowRight size={16} /></a>
              </div>
            </div>

            {/* Plano Safra */}
            <div className="plano-step-row reveal">
              <div className="plano-step-visual">
                <div className="plano-step-visual-container">
                  <img src={planoSafra} alt="Plano Safra" />
                </div>
              </div>
              <div className="plano-step-text">
                <span className="section-tag" style={{ fontSize: '0.75rem' }}>Fase de Aceleração</span>
                <h3>Plano Safra</h3>
                <p>Estratégia completa de CRM, marketing de atração, automações e tráfego multicanal.</p>
                <ul className="modal-list" style={{ margin: '0 0 2rem 0' }}>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Campanhas de Tráfego Pago avançado em Google, Meta, TikTok e YouTube.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Criação de até 3 Landing Pages personalizadas ou Funil Completo.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Integração e parametrização completa de CRM para seu comercial.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Fluxos de automação de e-mails para aquecimento de leads.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Relatório analítico quinzenal de ROI e Custo de Aquisição (CAC).</li>
                </ul>
                <a href="#contato" className="btn btn-primary" style={{ width: 'fit-content' }}>Contratar Plano Safra <ArrowRight size={16} /></a>
              </div>
            </div>

            {/* Plano Colheita */}
            <div className="plano-step-row reveal">
              <div className="plano-step-visual">
                <div className="plano-step-visual-container">
                  <img src={planoColheita} alt="Plano Colheita" />
                </div>
              </div>
              <div className="plano-step-text">
                <span className="section-tag" style={{ fontSize: '0.75rem' }}>Escala Máxima</span>
                <h3>Plano Colheita</h3>
                <p>Integração total de IA comercial ativa, tráfego com investimento agressivo e equipe dedicada.</p>
                <ul className="modal-list" style={{ margin: '0 0 2rem 0' }}>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Otimização diária de campanhas de alta escala com especialista sênior.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Landing Pages, sites e ecossistemas de conversão ilimitados de acordo com demanda.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Implementação de IA para qualificação e ativação de leads automática.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Treinamento comercial personalizado para o seu time de vendas.</li>
                </ul>
                <a href="#contato" className="btn btn-primary" style={{ width: 'fit-content' }}>Contratar Plano Colheita <ArrowRight size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO BLOG PREMIUM (CARDS HEXAGONAIS) */}
      <section className="blog" id="blog">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Nossos Artigos</span>
            <h2 className="section-title">Blog Somos Buzz</h2>
            <p className="section-desc">Estratégias comerciais, tráfego de alta escala e segredos de IA direto da nossa colmeia.</p>
          </div>

          <div className="blog-grid">
            <div className="hexagon-card blog-card">
              <span className="section-tag" style={{ fontSize: '0.7rem' }}>03 Ago, 2026</span>
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.25rem', margin: '1rem 0', color: '#ffffff', lineHeight: '1.3' }}>IA Comercial Ativa no WhatsApp</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: '1.5' }}>Como integrar IA no WhatsApp para diminuir o tempo de resposta e turbinar a conversão comercial.</p>
            </div>

            <div className="hexagon-card blog-card">
              <span className="section-tag" style={{ fontSize: '0.7rem' }}>01 Ago, 2026</span>
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.25rem', margin: '1rem 0', color: '#ffffff', lineHeight: '1.3' }}>Pipelines de Vendas e CRM</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: '1.5' }}>Entenda como organizar etapas claras no seu comercial para evitar a perda de clientes quentes.</p>
            </div>

            <div className="hexagon-card blog-card">
              <span className="section-tag" style={{ fontSize: '0.7rem' }}>28 Jul, 2026</span>
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.25rem', margin: '1rem 0', color: '#ffffff', lineHeight: '1.3' }}>Google Ads vs Meta Ads</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: '1.5' }}>Um comparativo detalhado focado no ROI para marcas premium escalarem seu faturamento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO QUEM SOMOS (MASCOTE EM FAVO HEXAGONAL) */}
      <section className="quem-somos" id="quem-somos" ref={quemSomosRef}>
        <div className="container">
          <div className="about-gallery-grid">
            <div className="gallery-showcase hexagon-mascot-container">
              <div className="hexagon-mascot-bg"></div>
              <img src={mascoteBuzz} alt="Mascote Somos Buzz" className="hexagon-mascot-img" />
            </div>

            <div className="dna-content">
              <span className="section-tag">Nossa Liderança</span>
              <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '2rem' }}>
                Muito mais que tráfego. Somos inteligência em vendas.
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                A <strong>Somos Buzz</strong> é liderada por especialistas focados em performance comercial. Entendemos que tráfego sem um processo de vendas bem estruturado é desperdício. Por isso, criamos ecossistemas completos para transformar leads em vendas todos os dias.
              </p>
              <div className="dna-features">
                <div className="dna-feature-item"><i className="ri-hexagon-fill" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(255,184,0,0.8))' }}></i> Foco Total em ROI</div>
                <div className="dna-feature-item"><i className="ri-hexagon-fill" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(255,184,0,0.8))' }}></i> Tecnologia e Inovação em IA</div>
                <div className="dna-feature-item"><i className="ri-hexagon-fill" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(255,184,0,0.8))' }}></i> Relatórios 100% Transparentes</div>
                <div className="dna-feature-item"><i className="ri-hexagon-fill" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(255,184,0,0.8))' }}></i> Parceria Estratégica Ponta a Ponta</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO CONTATO */}
      <section className="contact" id="contato" style={{ height: 'auto', minHeight: 'auto', padding: '9rem 0' }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-tag">Fale Conosco</span>
              <h2 className="contact-title">Pronto para iniciar sua colheita?</h2>
              <p className="contact-desc">
                Conte-nos sobre o seu modelo de negócio e veja como podemos implementar o Método Colmeia para gerar escala sustentável.
              </p>

              <div className="contact-channels">
                <div className="channel-item">
                  <div className="channel-icon">
                    <Mail size={20} />
                  </div>
                  <div className="channel-details">
                    <h4>E-mail Comercial</h4>
                    <p>contato@somosbuzzmkt.com.br</p>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon">
                    <Phone size={20} />
                  </div>
                  <div className="channel-details">
                    <h4>WhatsApp de Atendimento</h4>
                    <p>+55 (34) 9928-3020</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form id="contact-form" onSubmit={handleFormSubmit} autoComplete="off">
                
                {/* Passo 1: Informações Pessoais */}
                <div className={`form-step ${formStep === 1 ? 'active' : ''}`}>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '2rem', color: '#ffffff' }}>
                    Quem é o responsável pela colmeia?
                  </h3>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="form-input" 
                      placeholder=" " 
                      value={formData.name}
                      onChange={handleInputChange}
                      required={formStep === 1}
                    />
                    <label htmlFor="name" className="form-label">Seu Nome</label>
                  </div>

                  <div className="form-group">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-input" 
                      placeholder=" " 
                      value={formData.email}
                      onChange={handleInputChange}
                      required={formStep === 1}
                    />
                    <label htmlFor="email" className="form-label">Seu E-mail</label>
                  </div>

                  <div className="form-group">
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="form-input" 
                      placeholder=" "
                      value={formData.phone}
                      onChange={handleInputChange}
                      required={formStep === 1}
                    />
                    <label htmlFor="phone" className="form-label">WhatsApp</label>
                  </div>
                </div>

                {/* Passo 2: Faturamento (Gamificado) */}
                <div className={`form-step ${formStep === 2 ? 'active' : ''}`}>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1.5rem', color: '#ffffff' }}>
                    Qual o seu faturamento comercial médio hoje?
                  </h3>
                  <div className="billing-options">
                    <div 
                      className={`billing-option-btn ${formData.faturamento === 'Até R$ 50k' ? 'selected' : ''}`}
                      onClick={() => handleSelectBilling('Até R$ 50k')}
                    >
                      Até R$ 50k/mês
                    </div>
                    <div 
                      className={`billing-option-btn ${formData.faturamento === 'R$ 50k a R$ 150k' ? 'selected' : ''}`}
                      onClick={() => handleSelectBilling('R$ 50k a R$ 150k')}
                    >
                      R$ 50k a R$ 150k
                    </div>
                    <div 
                      className={`billing-option-btn ${formData.faturamento === 'R$ 150k a R$ 300k' ? 'selected' : ''}`}
                      onClick={() => handleSelectBilling('R$ 150k a R$ 300k')}
                    >
                      R$ 150k a R$ 300k
                    </div>
                    <div 
                      className={`billing-option-btn ${formData.faturamento === 'Acima de R$ 300k' ? 'selected' : ''}`}
                      onClick={() => handleSelectBilling('Acima de R$ 300k')}
                    >
                      Acima de R$ 300k
                    </div>
                  </div>
                </div>

                {/* Passo 3: Objetivo */}
                <div className={`form-step ${formStep === 3 ? 'active' : ''}`}>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '2rem', color: '#ffffff' }}>
                    Onde sua marca deseja chegar?
                  </h3>
                  <div className="form-group">
                    <textarea 
                      id="message" 
                      name="message" 
                      className="form-textarea" 
                      placeholder=" " 
                      value={formData.message}
                      onChange={handleInputChange}
                      required={formStep === 3}
                    ></textarea>
                    <label htmlFor="message" className="form-label">Qual o seu objetivo de faturamento a curto prazo?</label>
                  </div>
                </div>

                {/* Navegação do Formulário */}
                <div className="form-nav-btns">
                  {formStep > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setFormStep(prev => prev - 1)}
                    >
                      Voltar
                    </button>
                  )}
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ 
                      width: formStep === 1 ? '100%' : 'auto',
                      marginLeft: 'auto',
                      background: formStatus === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '' 
                    }}
                    disabled={formStatus === 'sending'}
                  >
                    {formStep < 3 && <>Continuar <ArrowRight size={16} /></>}
                    {formStep === 3 && formStatus === 'idle' && <>Falar com Consultor <Send size={16} /></>}
                    {formStep === 3 && formStatus === 'sending' && <>Enviando... <i className="ri-loader-4-line ri-spin"></i></>}
                    {formStep === 3 && formStatus === 'success' && <>Mensagem Enviada! <CheckCircle size={16} /></>}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <img src={logoBuzzMkt} alt="Somos Buzz" style={{ height: '44px', width: 'auto', marginBottom: '1.8rem' }} />
              <p>Conectando marcas a clientes e gerando crescimento acelerado com marketing digital de alta performance.</p>
            </div>

            <div className="footer-links-col">
              <h4>Navegação</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#servicos">Serviços</a></li>
                <li><a href="#metodo">Método Colmeia</a></li>
                <li><a href="#planos">Planos de Escala</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4>Redes Sociais</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/somosbuzzmkt/" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram"><i className="ri-instagram-line" style={{fontSize: '18px'}}></i></a>
                <a href="#" className="social-link" aria-label="LinkedIn"><i className="ri-linkedin-fill" style={{fontSize: '18px'}}></i></a>
                <a href="https://wa.me/553499283020" target="_blank" rel="noreferrer" className="social-link" aria-label="WhatsApp"><i className="ri-whatsapp-line" style={{fontSize: '18px'}}></i></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Somos Buzz. Todos os direitos reservados. Ecossistemas Digitais de Alta Conversão.</p>
          </div>
        </div>
      </footer>

      {/* Botão Voltar ao Topo (Estética Colmeia Glow) */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`} 
        onClick={() => {
          // Desativa o GSAP ScrollTrigger temporariamente e reseta a timeline do Hero para o início
          if (window.tlHero) {
            window.tlHero.progress(0);
          }
          
          // Utiliza scrollTo do Lenis forçando a rolagem imediata ao topo absoluto (posição 0)
          if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }

          // Atualiza as coordenadas dos Triggers
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 50);
        }}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </button>

      {/* Botão Flutuante do WhatsApp */}
      <a 
        href="https://wa.me/553499283020"
        target="_blank"
        rel="noreferrer"
        className={`whatsapp-float ${showBackToTop ? 'visible' : ''}`}
        aria-label="Falar no WhatsApp"
      >
        <i className="ri-whatsapp-line" style={{ fontSize: '24px' }}></i>
      </a>
    </>
  );
}

export default App;
