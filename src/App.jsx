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
  ChevronDown,
  ChevronUp,
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
import logoBuzzMkt from './assets/logo_buzz_horizontal.png';
import mascoteBuzz from './assets/mascote_buzz.png';

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

// Importação dos Diferenciais / Serviços
import imgIA from './assets/inteligencia_artificial.jpg';
import imgCrm from './assets/crm.jpg';
import imgMarketing from './assets/marketing_estrategico.jpg';
import imgEstrutura from './assets/estrutura_commercial.jpg';
import imgAutomacao from './assets/automacao_processos.jpg';
import imgConsultoria from './assets/consultorias_treinamentos.jpg';

// Importação da foto real da CEO/Fundadora
import tahyse1 from './assets/tahyse_1.png';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeEtapa, setActiveEtapa] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Referências para animações
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroVisualRef = useRef(null);

  const servicesRef = useRef(null);
  const metodoRef = useRef(null);
  const planosRef = useRef(null);
  const quemSomosRef = useRef(null);



  const etapasMetodo = [
    {
      title: "1. Direcionar",
      desc: "Análise profunda do posicionamento atual e definição da estratégia de conversão e atração da Somos Buzz.",
      img: parte12
    },
    {
      title: "2. Atrair",
      desc: "Criação de páginas e anúncios sob medida focados na captação inicial de tráfego ultra-qualificado no Google e Meta Ads.",
      img: parte13
    },
    {
      title: "3. Converter",
      desc: "Implementação de automações de e-mail e mensageria para aquecer os contatos captados antes do contato comercial.",
      img: parte14
    },
    {
      title: "4. Fidelizar",
      desc: "Parametrização completa do CRM com pipelines claros, permitindo o acompanhamento de cada negócio aberto em tempo real.",
      img: parte15
    },
    {
      title: "5. Desenvolver",
      desc: "Otimização de tarefas diárias e rotinas comerciais com inteligência artificial para maximizar a performance comercial.",
      img: parte16
    },
    {
      title: "6. Evoluir",
      desc: "Análise analítica de performance comercial, relatórios transparentes de ROI e reinvestimento estratégico para escala contínua.",
      img: parte17
    }
  ];

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', faturamento: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [formStep, setFormStep] = useState(1);



  // GSAP & Lenis Smooth Scroll Setup
  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 0.8, // Scroll inercial mais rápido e responsivo
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.25,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Conectar Lenis ao ScrollTrigger do GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Interceptar links âncora para compensar o header fixo
    const handleAnchorClick = (e) => {
      const link = e.currentTarget;
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, { offset: -70, duration: 1.0 });
        }
      }
    };
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => link.addEventListener('click', handleAnchorClick));

    // 2. TIMELINE HERO (Transição Suave para a Seção 2 sem travar tela)
    const isMobile = window.innerWidth <= 1024;
    const tlHero = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom 20%',
        scrub: 0.5
      }
    });
    tlHero.to(heroContentRef.current, { opacity: 0.2, y: isMobile ? -20 : -40, duration: 1 }, 0);
    tlHero.to(heroVisualRef.current, { opacity: 0.2, scale: isMobile ? 0.98 : 0.95, duration: 1 }, 0);
    window.tlHero = tlHero;

    // 3. ENTRADA DE SERVIÇOS (Revelação fluida ao rolar)
    gsap.fromTo(".services .section-header", 
      { opacity: 0, y: 35 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
    gsap.fromTo(".services .hexagon-card", 
      { opacity: 0, y: 50, scale: 0.94 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        stagger: 0.1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".services .services-grid",
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 4. TIMELINE MÉTODO COLMEIA EM ZIGUE-ZAGUE
    gsap.utils.toArray(".metodo-step-row").forEach((row, index) => {
      const visualContainer = row.querySelector(".metodo-step-visual-container");
      const textContainer = row.querySelector(".metodo-step-text");
      const direction = index % 2 === 0 ? 1 : -1;

      gsap.fromTo(visualContainer, 
        { 
          opacity: 0, 
          x: isMobile ? 0 : direction * 150, 
          y: isMobile ? 40 : 0,
          rotate: isMobile ? 0 : direction * 25, 
          scale: 0.85
        },
        { 
          opacity: 1, 
          x: 0, 
          y: 0,
          rotate: 0, 
          scale: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: row,
            start: isMobile ? "top 90%" : "top 95%",
            end: "top 70%",
            scrub: 0.5
          }
        }
      );

      gsap.fromTo(textContainer,
        {
          opacity: 0,
          y: 30,
          filter: "blur(4px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          scrollTrigger: {
            trigger: row,
            start: isMobile ? "top 88%" : "top 90%",
            end: "top 70%",
            scrub: 0.5
          }
        }
      );
    });

    // 6. TIMELINE PLANOS EM ZIGUE-ZAGUE
    gsap.utils.toArray(".plano-step-row").forEach((row) => {
      gsap.fromTo(row, 
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: row,
            start: isMobile ? "top 92%" : "top 90%",
            end: "top 75%",
            scrub: 0.5
          }
        }
      );
    });

    // Animação da Seção do Blog
    gsap.utils.toArray(".blog-card").forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: isMobile ? "top 92%" : "top 95%",
            end: "top 75%",
            scrub: 0.5
          }
        }
      );
    });

    // 7. TIMELINE QUEM SOMOS (Revelação fluida)
    gsap.fromTo(".gallery-showcase", 
      { opacity: 0, scale: 0.9, x: isMobile ? 0 : -40 }, 
      { 
        opacity: 1, 
        scale: 1, 
        x: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: quemSomosRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
    gsap.fromTo(".quem-somos .dna-content", 
      { opacity: 0, x: isMobile ? 0 : 40 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: quemSomosRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

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
              <h1 className="hero-title">
                Sua empresa cresce quando Marketing e Vendas <span className="text-gradient-buzz">trabalham juntos</span>
              </h1>
              <p className="hero-desc">
                A Buzz estrutura Marketing, Vendas, CRM e Inteligência Artificial para empresas que querem crescer com organização, previsibilidade e resultados consistentes.
              </p>
              <div className="hero-btns">
                <a href="#contato" className="btn btn-primary">Agendar Diagnóstico <Rocket size={16} /></a>
                <a href="#servicos" className="btn btn-secondary">Conhecer Soluções</a>
              </div>
            </div>

            <div className="hero-visual" ref={heroVisualRef}>
              <div className="hero-glow-blob" style={{ bottom: '0' }}></div>
              <img 
                src={tahyse1} 
                alt="CEO Tahyse Somos Buzz" 
                className="hero-ceo-img"
              />
            </div>
          </div>
        </div>
        <div className="section-nav">
          <a href="#servicos" className="scroll-down-btn" aria-label="Ir para Soluções">
            <ChevronDown size={24} />
          </a>
        </div>
      </section>

      {/* SEÇÃO SOLUÇÕES PREMIUM (CARDS HEXAGONAIS) */}
      <section className="services" id="servicos" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Nossos Serviços</span>
            <h2 className="section-title" style={{ fontSize: '2rem', maxWidth: '800px', margin: '0 auto' }}>Estratégias que conectam Marketing, Vendas, CRM e Inteligência Artificial para transformar processos em resultados.</h2>
          </div>

          <div className="services-grid" style={{ marginTop: '4rem' }}>
            <div className="hexagon-card service-card has-bg" style={{ backgroundImage: `url(${imgMarketing})` }}>
              <Megaphone size={34} className="text-gradient-buzz" style={{ marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#ffffff' }}>Marketing Estratégico</h3>
              <p style={{ color: '#f0f0f0', fontSize: '0.85rem', lineHeight: '1.5' }}>Planejamos ações que fortalecem sua marca, atraem o público certo e criam oportunidades reais de negócio. Cada estratégia é desenvolvida de acordo com os objetivos da empresa e alinhada ao processo comercial.</p>
            </div>

            <div className="hexagon-card service-card has-bg" style={{ backgroundImage: `url(${imgEstrutura})` }}>
              <TrendingUp size={34} className="text-gradient-buzz" style={{ marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#ffffff' }}>Estrutura Comercial</h3>
              <p style={{ color: '#f0f0f0', fontSize: '0.85rem', lineHeight: '1.5' }}>Organizamos o processo de vendas para que sua equipe tenha mais eficiência, previsibilidade e controle sobre cada oportunidade. Definimos fluxos, acompanhamentos e indicadores que ajudam a aumentar a conversão.</p>
            </div>

            <div className="hexagon-card service-card has-bg" style={{ backgroundImage: `url(${imgCrm})` }}>
              <Users size={34} className="text-gradient-buzz" style={{ marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#ffffff' }}>CRM</h3>
              <p style={{ color: '#f0f0f0', fontSize: '0.85rem', lineHeight: '1.5' }}>Implementamos e configuramos o CRM para centralizar informações, organizar atendimentos, automatizar tarefas e acompanhar toda a jornada do cliente, tornando o processo comercial mais produtivo.</p>
            </div>

            <div className="hexagon-card service-card has-bg" style={{ backgroundImage: `url(${imgIA})` }}>
              <Zap size={34} className="text-gradient-buzz" style={{ marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#ffffff' }}>Inteligência Artificial</h3>
              <p style={{ color: '#f0f0f0', fontSize: '0.85rem', lineHeight: '1.5' }}>Aplicamos soluções de Inteligência Artificial para automatizar processos, otimizar atendimentos, gerar produtividade e apoiar a tomada de decisões com mais agilidade e inteligência.</p>
            </div>

            <div className="hexagon-card service-card has-bg" style={{ backgroundImage: `url(${imgAutomacao})` }}>
              <Code size={34} className="text-gradient-buzz" style={{ marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#ffffff' }}>Automação de Processos</h3>
              <p style={{ color: '#f0f0f0', fontSize: '0.85rem', lineHeight: '1.5' }}>Reduzimos tarefas manuais por meio de integrações e automações que conectam sistemas, equipes e informações, permitindo que sua empresa trabalhe de forma mais eficiente.</p>
            </div>

            <div className="hexagon-card service-card has-bg" style={{ backgroundImage: `url(${imgConsultoria})` }}>
              <Share2 size={34} className="text-gradient-buzz" style={{ marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#ffffff' }}>Consultorias e Treinamentos</h3>
              <p style={{ color: '#f0f0f0', fontSize: '0.85rem', lineHeight: '1.5' }}>Capacitamos equipes e acompanhamos a implementação de estratégias para que Marketing e Vendas atuem de forma integrada, utilizando processos, ferramentas e tecnologia como aliados do crescimento.</p>
            </div>
          </div>
        </div>
        <div className="section-nav">
          <a href="#home" className="scroll-up-btn" aria-label="Voltar para Home">
            <ChevronUp size={24} />
          </a>
          <a href="#metodo" className="scroll-down-btn" aria-label="Ir para Método Colmeia">
            <ChevronDown size={24} />
          </a>
        </div>
      </section>

      {/* SEÇÃO MÉTODO COLMEIA INTERATIVO (ZIGUE-ZAGUE TIMELINE) */}
      <section className="metodo" id="metodo" ref={metodoRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Por que o Método Colmeia?</span>
            <h2 className="section-title">O Método Colmeia</h2>
            <p className="section-desc">Grandes resultados não acontecem por acaso. Eles são construídos por meio de estratégia, organização e execução consistente. O Método Colmeia é a metodologia exclusiva da Buzz para integrar Marketing, Vendas, CRM e Inteligência Artificial em um único processo.</p>
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
        <div className="section-nav">
          <a href="#servicos" className="scroll-up-btn" aria-label="Voltar para Soluções">
            <ChevronUp size={24} />
          </a>
          <a href="#planos" className="scroll-down-btn" aria-label="Ir para Planos">
            <ChevronDown size={24} />
          </a>
        </div>
      </section>

      {/* SEÇÃO PLANOS DE CRESCIMENTO (ZIGUE-ZAGUE TIMELINE) */}
      <section className="portfolio" id="planos" ref={planosRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Soluções</span>
            <h2 className="section-title">Soluções Estruturadas</h2>
            <p className="section-desc">Cada empresa está em um momento diferente de crescimento. Por isso, desenvolvemos soluções estruturadas que combinam estratégia, execução e acompanhamento para transformar desafios em resultados concretos.</p>
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
                <span className="section-tag" style={{ fontSize: '0.75rem' }}>O primeiro passo</span>
                <h3>Plano Semente</h3>
                <p>Ideal para negócios que precisam estruturar Marketing e Vendas antes de acelerar o crescimento. Em 30 dias, realizamos um diagnóstico completo, definimos objetivos, construímos um plano de ação e entregamos uma estratégia personalizada.</p>
                <ul className="modal-list" style={{ margin: '0 0 2rem 0' }}>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Indicado para iniciar o crescimento com organização.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Base sólida para o desenvolvimento da empresa.</li>
                </ul>
                <a href="#contato" className="btn btn-primary" style={{ width: 'fit-content' }}>Agendar Diagnóstico <ArrowRight size={16} /></a>
              </div>
            </div>

            {/* Projeto Colheita */}
            <div className="plano-step-row reveal">
              <div className="plano-step-visual">
                <div className="plano-step-visual-container">
                  <img src={planoColheita} alt="Projeto Colheita" />
                </div>
              </div>
              <div className="plano-step-text">
                <span className="section-tag" style={{ fontSize: '0.75rem' }}>Planejamento e Execução</span>
                <h3>Projeto Colheita</h3>
                <p>Durante 06 meses, trabalhamos lado a lado com sua empresa para transformar o planejamento em resultados. Integramos Marketing, Comercial, CRM, IA e acompanhamento contínuo para construir processos eficientes e gerar crescimento consistente.</p>
                <ul className="modal-list" style={{ margin: '0 0 2rem 0' }}>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Parceria estratégica focada em evolução.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Atuação completa para acelerar resultados.</li>
                </ul>
                <a href="#contato" className="btn btn-primary" style={{ width: 'fit-content' }}>Agendar Diagnóstico <ArrowRight size={16} /></a>
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
                <span className="section-tag" style={{ fontSize: '0.75rem' }}>Evolução Contínua</span>
                <h3>Plano Safra</h3>
                <p>Planejamento para empresas que querem crescer com previsibilidade. Com acompanhamento de 12 meses, esta solução é voltada para empresas que buscam evolução contínua, organização dos processos e crescimento sustentável.</p>
                <ul className="modal-list" style={{ margin: '0 0 2rem 0' }}>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Estratégias alinhadas aos objetivos da empresa.</li>
                  <li className="modal-list-item"><CheckCircle size={18} className="text-gradient-buzz" /> Acompanhamento de indicadores e ajustes.</li>
                </ul>
                <a href="#contato" className="btn btn-primary" style={{ width: 'fit-content' }}>Agendar Diagnóstico <ArrowRight size={16} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="section-nav">
          <a href="#metodo" className="scroll-up-btn" aria-label="Voltar para Método Colmeia">
            <ChevronUp size={24} />
          </a>
          <a href="#blog" className="scroll-down-btn" aria-label="Ir para Blog">
            <ChevronDown size={24} />
          </a>
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
        <div className="section-nav">
          <a href="#planos" className="scroll-up-btn" aria-label="Voltar para Planos">
            <ChevronUp size={24} />
          </a>
          <a href="#quem-somos" className="scroll-down-btn" aria-label="Ir para Quem Somos">
            <ChevronDown size={24} />
          </a>
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
              <span className="section-tag">Sobre a Buzz</span>
              <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '2rem' }}>
                Mais do que uma empresa de Marketing. Somos parceiros estratégicos para o crescimento do seu negócio.
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                A Buzz nasceu da percepção de um problema comum em muitas empresas: investir em marketing sem ter um processo comercial estruturado para transformar oportunidades em vendas. Por isso, unimos Marketing Estratégico, Vendas, CRM e Inteligência Artificial para criar soluções que organizam processos, fortalecem equipes e geram crescimento com previsibilidade.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Acreditamos que vender mais não depende apenas de atrair clientes. Depende de estratégia, organização e acompanhamento. Nosso papel é construir esse caminho ao lado de cada empresa, desenvolvendo soluções personalizadas. Porque o crescimento sustentável acontece quando Marketing e Vendas trabalham juntos.
              </p>
              <div className="dna-features" style={{ marginTop: '2rem' }}>
                <div className="dna-feature-item"><i className="ri-hexagon-fill" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(255,184,0,0.8))' }}></i> Estratégia antes da execução</div>
                <div className="dna-feature-item"><i className="ri-hexagon-fill" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(255,184,0,0.8))' }}></i> Relacionamentos construídos com confiança</div>
                <div className="dna-feature-item"><i className="ri-hexagon-fill" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(255,184,0,0.8))' }}></i> Inovação aplicada à realidade do negócio</div>
                <div className="dna-feature-item"><i className="ri-hexagon-fill" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(255,184,0,0.8))' }}></i> Compromisso com resultados e evolução contínua</div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-nav">
          <a href="#blog" className="scroll-up-btn" aria-label="Voltar para Blog">
            <ChevronUp size={24} />
          </a>
          <a href="#contato" className="scroll-down-btn" aria-label="Ir para Contato">
            <ChevronDown size={24} />
          </a>
        </div>
      </section>

      {/* SEÇÃO CONTATO */}
      <section className="contact" id="contato" style={{ height: 'auto', minHeight: 'auto', padding: '9rem 0' }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-tag">Qual solução é a ideal?</span>
              <h2 className="contact-title">Vamos construir o próximo passo do seu negócio?</h2>
              <p className="contact-desc">
                Transforme Marketing, Vendas, CRM e Inteligência Artificial em uma estratégia integrada para crescer com mais organização, previsibilidade e resultados.
              </p>

              <div className="contact-channels" style={{ marginBottom: '2rem' }}>
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

              <div className="dna-features" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <div className="dna-feature-item" style={{ fontSize: '0.9rem' }}><CheckCircle size={16} className="text-gradient-buzz" /> Parceiro Oficial Kommo CRM</div>
                <div className="dna-feature-item" style={{ fontSize: '0.9rem' }}><CheckCircle size={16} className="text-gradient-buzz" /> Projetos Sob Medida</div>
                <div className="dna-feature-item" style={{ fontSize: '0.9rem' }}><CheckCircle size={16} className="text-gradient-buzz" /> Sem Soluções Milagrosas</div>
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
        <div className="section-nav" style={{ bottom: '-1rem' }}>
          <a href="#quem-somos" className="scroll-up-btn" aria-label="Voltar para Quem Somos">
            <ChevronUp size={24} />
          </a>
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
