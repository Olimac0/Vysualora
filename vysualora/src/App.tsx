import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Zap, 
  Sparkles, 
  Check, 
  Star, 
  Clock, 
  Shield, 
  Download, 
  ArrowRight,
  ChevronRight,
  Gift,
  TrendingUp,
  Users,
  Package,
  Lock,
  Trophy,
  Heart,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  CreditCard,
  RefreshCw,
  Menu,
  X,
  Award,
  Palette,
  Rocket
} from 'lucide-react'
import { cn } from './utils/cn'
import Scene3D from './components/Scene3D'
import ScrollProgress from './components/ScrollProgress'
import ParticleBackground from './components/ParticleBackground'

// ============ ADVANCED ANIMATED BACKGROUND ============
const AdvancedAnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden bg-[#050507] particle-bg">
      {/* Dynamic gradient orbs */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          left: '20%',
          top: '30%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          left: '70%',
          top: '60%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Moving grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: `${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%`
        }}
      />
      
      {/* Animated particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] h-[1px] bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0.1, 0.8, 0.1]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-texture" />
    </div>
  )
}

// ============ ADVANCED CUSTOM CURSOR ============
const AdvancedCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (window.innerWidth < 768) return
    
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    
    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      }
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      }
      
      requestAnimationFrame(animate)
    }
    
    window.addEventListener('mousemove', moveCursor)
    animate()
    
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])
  
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null
  
  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 pointer-events-none z-[9999]"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
      </div>
      <div 
        ref={glowRef}
        className="cursor-glow"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  )
}

// ============ SCROLL-TRIGGERED ANIMATION TEXT ============
const ScrollRevealText = ({ 
  children, 
  className = "",
  delay = 0,
  direction = "up"
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const directionMap = {
    up: [30, 0],
    down: [-30, 0],
    left: [30, 0],
    right: [-30, 0]
  }
  
  const y = useTransform(scrollYProgress, [0, 1], directionMap[direction])
  const x = direction === "left" || direction === "right" ? y : 0
  const actualY = direction === "up" || direction === "down" ? y : 0
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9])
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 10])
  
  return (
    <motion.div
      ref={ref}
      style={{ 
        y: actualY, 
        x, 
        opacity, 
        scale,
        filter: `blur(${blur}px)` 
      }}
      initial={{ opacity: 0, y: direction === "up" ? 40 : direction === "down" ? -40 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1],
        delay 
      }}
      className={cn("scroll-driven", className)}
    >
      {children}
    </motion.div>
  )
}

// ============ 3D GLOW CARD ============
const GlowCard3D = ({ 
  children, 
  className = "",
  highlight = false,
  interactive = true,
  delay = 0
}: { 
  children: React.ReactNode
  className?: string
  highlight?: boolean
  interactive?: boolean
  delay?: number
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateY: 10 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      whileHover={interactive ? { y: -15, scale: 1.02 } : {}}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1],
        delay 
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl card-3d",
        "bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.01]",
        "border border-white/[0.08]",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_30px_60px_-20px_rgba(0,0,0,0.8)]",
        highlight && "border-purple-500/50 shadow-[0_0_80px_rgba(124,58,237,0.4)]",
        interactive && "cursor-pointer hover:border-purple-500/70 hover:shadow-[0_0_100px_rgba(124,58,237,0.5)]",
        "backdrop-blur-2xl",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/[0.02] before:to-transparent",
        "after:absolute after:inset-0 after:bg-gradient-to-br after:from-purple-500/[0.03] after:via-transparent after:to-cyan-500/[0.03]",
        className
      )}
    >
      {/* Animated gradient border */}
      {highlight && (
        <div className="absolute inset-0 rounded-3xl p-[2px]">
          <div className="w-full h-full bg-gradient-to-r from-purple-500/40 via-cyan-500/40 to-purple-500/40 rounded-3xl animate-gradient-shift" />
        </div>
      )}
      
      <div className="relative z-10 card-3d-inner">
        {children}
      </div>
      
      {/* Hover glow effect */}
      {interactive && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 blur-xl" />
        </div>
      )}
    </motion.div>
  )
}

// ============ MAGNETIC BUTTON ============
const MagneticButton = ({ 
  children, 
  variant = "primary",
  className = "",
  onClick
}: { 
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  className?: string
  onClick?: () => void
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || window.innerWidth < 768) return
    
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const deltaX = (x - centerX) * 0.2
    const deltaY = (y - centerY) * 0.2
    
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }
  
  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = 'translate(0, 0)'
  }
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-500 text-white shadow-[0_20px_60px_rgba(124,58,237,0.4)] hover:shadow-[0_30px_80px_rgba(124,58,237,0.6)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20",
    ghost: "bg-transparent text-white/80 hover:text-white hover:bg-white/5"
  }
  
  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "magnetic-effect relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg uppercase tracking-tighter transition-all duration-300",
        variants[variant],
        className
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
    </motion.button>
  )
}

// ============ HEADER WITH BLUR EFFECT ============
const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount] = useState(3)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-6",
          scrolled 
            ? "py-4 bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg"
            >
              <Sparkles className="text-white" size={20} />
            </motion.div>
            <div className="text-2xl font-black tracking-tighter">
              <span className="text-white">VYSUALORA</span>
              <span className="text-gradient-animated">.</span>
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['Productos', 'Bundles', 'Reviews', 'Precios'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="text-sm font-bold uppercase tracking-wider text-white/80 hover:text-purple-400 transition-colors group relative"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <ShoppingCart size={20} className="text-white" />
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-xs font-black text-white">{cartCount}</span>
                </motion.div>
              )}
            </motion.button>
            
            <MagneticButton variant="primary">
              <Zap size={16} />
              Comprar Ahora
            </MagneticButton>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[73px] left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 z-40 md:hidden"
          >
            <div className="p-6 space-y-6">
              {['Productos', 'Bundles', 'Reviews', 'Precios'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="block text-lg font-bold text-white hover:text-purple-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-6 border-t border-white/10">
                <MagneticButton variant="primary" className="w-full">
                  <Zap size={16} />
                  Comprar Bundle
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============ URGENCY BANNER (SEPARATE FROM HEADER) ============
const UrgencyBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 59,
    seconds: 59
  })
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-[73px] left-0 w-full z-40 py-3 px-4 bg-gradient-to-r from-purple-600/90 via-violet-600/90 to-cyan-600/90 backdrop-blur-xl border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 text-white text-sm font-bold">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} />
            </motion.div>
            <span className="uppercase tracking-wider">🚀 OFERTA FLASH: 85% OFF</span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-3">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex items-center gap-1">
                <div className="bg-black/40 rounded-lg px-3 py-2 min-w-[60px] text-center backdrop-blur-sm">
                  <div className="text-2xl font-black text-white tabular-nums">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-white/70 mt-1">
                    {unit === 'hours' ? 'HORAS' : unit === 'minutes' ? 'MIN' : 'SEG'}
                  </div>
                </div>
                {unit !== 'seconds' && (
                  <span className="text-white/50 text-lg font-black">:</span>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-white text-sm font-bold">
            Solo quedan <span className="text-cyan-300 animate-pulse">47</span> bundles disponibles
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============ HERO SECTION WITH KINETIC TEXT ============
const HeroSection = () => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  
  return (
    <motion.section 
      style={{ scale, y }}
      className="min-h-screen flex items-center justify-center px-4 md:px-6 pt-32 md:pt-40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Badge */}
        <ScrollRevealText delay={0.1}>
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-8"
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <TrendingUp size={14} />
            <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">
              +5,127 CREADORES TRANSFORMADOS
            </span>
          </motion.div>
        </ScrollRevealText>
        
        {/* Main Title */}
        <ScrollRevealText delay={0.2} direction="up">
          <h1 className="text-responsive-hero font-black tracking-tighter mb-6">
            <span className="block">CREA CONTENIDO</span>
            <span className="text-gradient-animated bg-clip-text text-transparent">
              QUE VENDE
            </span>
          </h1>
        </ScrollRevealText>
        
        {/* Subtitle */}
        <ScrollRevealText delay={0.3} direction="up">
          <p className="text-responsive-subtitle text-white/70 max-w-3xl mx-auto leading-relaxed mb-10">
            El <span className="text-white font-bold">bundle premium</span> que transforma tus habilidades creativas en{' '}
            <span className="text-cyan-300 font-bold">ingresos reales</span>. Todo lo que necesitas para destacar y vender más.
          </p>
        </ScrollRevealText>
        
        {/* CTA Buttons */}
        <ScrollRevealText delay={0.4} direction="up">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton variant="primary" className="px-10 py-5 text-xl">
              <Zap size={24} />
              ¡QUIERO EL BUNDLE AHORA!
              <ArrowRight size={24} />
            </MagneticButton>
            
            <MagneticButton variant="secondary" className="px-8 py-5 text-lg">
              <span className="flex items-center gap-2">
                Ver demo gratuita
                <span className="typing-cursor" />
              </span>
            </MagneticButton>
          </div>
        </ScrollRevealText>
        
        {/* Trust Badges */}
        <ScrollRevealText delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Download, text: 'Descarga Inmediata', color: 'from-cyan-500 to-blue-500' },
              { icon: Lock, text: 'Pago 100% Seguro', color: 'from-green-500 to-emerald-500' },
              { icon: Clock, text: '30 Días Garantía', color: 'from-amber-500 to-orange-500' },
              { icon: Gift, text: 'Actualizaciones Gratis', color: 'from-violet-500 to-purple-500' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <item.icon className="text-white" size={20} />
                </div>
                <span className="text-sm text-white/80 text-center font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </ScrollRevealText>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-white/40 text-sm uppercase tracking-wider">
            Scroll para descubrir
          </div>
          <div className="w-[2px] h-10 bg-gradient-to-b from-purple-500 to-transparent mx-auto mt-2" />
        </motion.div>
      </div>
    </motion.section>
  )
}

// ============ PRODUCT SHOWCASE WITH 3D EFFECTS ============
const ProductShowcase = () => {
  const products = [
    {
      title: "Instagram Pro",
      subtitle: "150+ Templates",
      description: "Stories, Posts, Reels y Carruseles que captan atención instantánea",
      color: "from-pink-500 to-purple-600",
      emoji: "📱",
      stats: "+3K ventas",
      icon: Instagram
    },
    {
      title: "AI Prompts",
      subtitle: "500+ Comandos",
      description: "ChatGPT, Midjourney, Claude. Ahorra 40h semanales",
      color: "from-purple-500 to-cyan-500",
      emoji: "🤖",
      stats: "98% efectivos",
      icon: Sparkles
    },
    {
      title: "Canva Pro",
      subtitle: "200+ Recursos",
      description: "Elementos premium listos para personalizar en Canva",
      color: "from-cyan-500 to-blue-600",
      emoji: "🎨",
      stats: "5⭐ rating",
      icon: Palette
    },
    {
      title: "Ebook Design",
      subtitle: "50+ Layouts",
      description: "Ebooks profesionales que convierten visitas en clientes",
      color: "from-violet-500 to-pink-500",
      emoji: "📚",
      stats: "+€500K generados",
      icon: Award
    }
  ]
  
  return (
    <section id="productos" className="py-20 md:py-32 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollRevealText delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-6">
              <Package size={14} />
              <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">
                PRODUCTOS QUE CONVIERTEN
              </span>
            </div>
          </ScrollRevealText>
          
          <ScrollRevealText delay={0.2}>
            <h2 className="text-responsive-title font-black tracking-tighter mb-6">
              TODO LO QUE{' '}
              <span className="text-gradient-animated">
                NECESITAS
              </span>
            </h2>
          </ScrollRevealText>
          
          <ScrollRevealText delay={0.3}>
            <p className="text-responsive-body text-white/70 max-w-2xl mx-auto leading-relaxed">
              Herramientas probadas que generan resultados reales. Sin complicaciones, solo resultados.
            </p>
          </ScrollRevealText>
        </div>
        
        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <GlowCard3D key={index} delay={index * 0.1} interactive>
              <div className="p-6">
                {/* Animated Emoji */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 shadow-lg`}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  <span className="text-3xl">{product.emoji}</span>
                </motion.div>
                
                <h3 className="text-2xl font-black mb-2">{product.title}</h3>
                <p className="text-purple-300 text-sm font-bold mb-4">{product.subtitle}</p>
                
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyan-300 font-bold">{product.stats}</span>
                  <MagneticButton variant="ghost" className="!p-2">
                    <ChevronRight size={16} />
                  </MagneticButton>
                </div>
              </div>
            </GlowCard3D>
          ))}
        </div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "5,127+", label: "Creadores", icon: Users },
            { value: "98%", label: "Satisfacción", icon: Heart },
            { value: "€2.4M+", label: "Generado", icon: Trophy },
            { value: "4.9", label: "Rating", icon: Star }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gradient-animated mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 flex items-center justify-center gap-2">
                <stat.icon size={16} />
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============ BUNDLES SECTION WITH INTERACTIVE SELECTOR ============
const BundlesSection = () => {
  const [selectedBundle, setSelectedBundle] = useState(1)
  
  const bundles = [
    {
      id: 0,
      name: "Starter",
      price: 29,
      originalPrice: 199,
      savings: 85,
      description: "Para comenzar tu viaje digital",
      features: [
        "150+ Instagram Templates",
        "100 AI Prompts Básicos",
        "Recursos Canva Essentials",
        "Acceso de por vida",
        "Actualizaciones por 1 año"
      ],
      cta: "Comenzar Starter",
      popular: false,
      color: "from-gray-600 to-gray-400"
    },
    {
      id: 1,
      name: "Pro",
      price: 47,
      originalPrice: 547,
      savings: 91,
      description: "El pack más vendido (Recomendado)",
      features: [
        "TODO el Starter Pack",
        "+500 AI Prompts Avanzados",
        "Templates de Reels & Carruseles",
        "Recursos Canva Premium",
        "Ebook Templates Collection",
        "Web Assets & UI Kits",
        "Actualizaciones MENSUALES",
        "Licencia Comercial Extendida",
        "Soporte Prioritario 24/7"
      ],
      cta: "¡QUIERO EL BUNDLE PRO!",
      popular: true,
      color: "from-purple-600 to-cyan-500"
    },
    {
      id: 2,
      name: "Agency",
      price: 97,
      originalPrice: 997,
      savings: 90,
      description: "Para agencias y equipos",
      features: [
        "TODO el Pro Pack",
        "Licencia para Equipos",
        "Brand Kits Premium",
        "Soporte Dedicado",
        "Training Sessions",
        "Accesso Anticipado",
        "Whitelabel Ready"
      ],
      cta: "Para Agencias",
      popular: false,
      color: "from-violet-600 to-pink-500"
    }
  ]
  
  return (
    <section id="bundles" className="py-20 md:py-32 px-4 md:px-6 relative bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollRevealText delay={0.1}>
            <h2 className="text-responsive-title font-black tracking-tighter mb-6">
              ELIGE TU{' '}
              <span className="text-gradient-animated">
                PODER
              </span>
            </h2>
          </ScrollRevealText>
          
          <ScrollRevealText delay={0.2}>
            <p className="text-responsive-body text-white/70 max-w-2xl mx-auto leading-relaxed">
              Invierte en tu éxito. Un solo pago, resultados para siempre.
            </p>
          </ScrollRevealText>
        </div>
        
        {/* Bundle Selector */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex rounded-full bg-white/5 p-2 backdrop-blur-sm">
            {bundles.map((bundle) => (
              <button
                key={bundle.id}
                onClick={() => setSelectedBundle(bundle.id)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300",
                  selectedBundle === bundle.id
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {bundle.name}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Bundle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <GlowCard3D
              key={bundle.id}
              highlight={bundle.popular}
              className={cn(
                "h-full flex flex-col",
                selectedBundle === bundle.id && "scale-105"
              )}
            >
              <div className="p-8 flex-1">
                {/* Popular Badge */}
                {bundle.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-500 px-6 py-2 rounded-full text-white text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-lg"
                  >
                    ✦ EL MÁS VENDIDO ✦
                  </motion.div>
                )}
                
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-black mb-2">{bundle.name}</h3>
                  <p className="text-white/60">{bundle.description}</p>
                </div>
                
                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-5xl font-black">€{bundle.price}</span>
                    <span className="text-white/50 line-through">€{bundle.originalPrice}</span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                      -{bundle.savings}%
                    </span>
                  </div>
                  <p className="text-white/50 text-sm">Un solo pago • Acceso de por vida</p>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {bundle.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <Check className="text-cyan-400 shrink-0" size={18} />
                      <span className="text-white/90">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <MagneticButton 
                  variant={bundle.popular ? "primary" : "secondary"}
                  className="w-full py-4 rounded-xl"
                >
                  {bundle.cta}
                  {bundle.popular && <Rocket size={20} />}
                </MagneticButton>
              </div>
            </GlowCard3D>
          ))}
        </div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          {[
            { icon: Shield, text: 'Pago 100% Seguro', color: 'text-purple-400' },
            { icon: Download, text: 'Descarga Inmediata', color: 'text-cyan-400' },
            { icon: RefreshCw, text: '30 Días Garantía', color: 'text-green-400' },
            { icon: Users, text: '+5K Creadores', color: 'text-violet-400' },
            { icon: CreditCard, text: 'Pagos Seguros', color: 'text-blue-400' }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <item.icon className={item.color} size={20} />
              <span className="text-sm font-bold">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============ TESTIMONIALS WITH PARALLAX ============
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "María García",
      role: "Diseñadora UX",
      content: "Literal cambió mi negocio. Pasé de diseñar horas a tener todo listo en minutos. El ROI fue inmediato 💸",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      revenue: "+€3,200/mes"
    },
    {
      name: "Carlos Mendez",
      role: "Content Creator",
      content: "Los prompts de IA son INCREÍBLES. Ahorro mínimo 20 horas a la semana. Vale cada centavo y más 🔥",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      revenue: "40h/semana"
    },
    {
      name: "Ana López",
      role: "Social Media Manager",
      content: "Mis clientes piensan que contraté un equipo de diseño. La calidad es de agencia premium ✨",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      revenue: "+15 clientes"
    }
  ]
  
  return (
    <section id="reviews" className="py-20 md:py-32 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollRevealText delay={0.1}>
            <div className="flex justify-center gap-1 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="fill-current" />
              ))}
            </div>
          </ScrollRevealText>
          
          <ScrollRevealText delay={0.2}>
            <h2 className="text-responsive-title font-black tracking-tighter mb-6">
              ELLOS YA{' '}
              <span className="text-gradient-animated">
                LO LOGRARON
              </span>
            </h2>
          </ScrollRevealText>
          
          <ScrollRevealText delay={0.3}>
            <p className="text-responsive-body text-white/70 max-w-2xl mx-auto leading-relaxed">
              Descubre cómo estos creadores transformaron su negocio con Vysualora.
            </p>
          </ScrollRevealText>
        </div>
        
        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <GlowCard3D key={index} delay={index * 0.1}>
              <div className="p-8">
                {/* Stars */}
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-white text-lg italic leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                  />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto bg-gradient-to-r from-purple-500/20 to-cyan-500/20 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-cyan-300">{testimonial.revenue}</span>
                  </div>
                </div>
                
                {/* CTA */}
                <MagneticButton variant="ghost" className="w-full !py-3">
                  Ver caso completo
                  <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </GlowCard3D>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ FINAL CTA WITH EXPLOSIVE ANIMATION ============
const FinalCTASection = () => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"
      />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Animated Icon */}
        <ScrollRevealText>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-6xl md:text-8xl mb-6 inline-block"
          >
            ⚡
          </motion.div>
        </ScrollRevealText>
        
        {/* Title */}
        <ScrollRevealText delay={0.1}>
          <h2 className="text-responsive-title font-black tracking-tighter mb-6">
            NO ESPERES{' '}
            <span className="text-gradient-animated">
              MÁS
            </span>
          </h2>
        </ScrollRevealText>
        
        {/* Subtitle */}
        <ScrollRevealText delay={0.2}>
          <p className="text-responsive-body text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
            Cada día sin estas herramientas es <span className="text-white font-bold">dinero que dejas sobre la mesa</span>.
            Tu futuro self te lo agradecerá.
          </p>
        </ScrollRevealText>
        
        {/* Explosive CTA Button */}
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          className="inline-block"
        >
          <MagneticButton 
            variant="primary" 
            className="px-12 py-6 text-2xl relative overflow-hidden group"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-4">
              <ShoppingCart size={28} />
              <span className="text-nowrap">OBTENER ACCESO TOTAL</span>
              <ArrowRight size={28} />
            </span>
            
            {/* Glow effect */}
            <motion.div
              animate={isHovered ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 blur-xl opacity-30"
            />
          </MagneticButton>
        </motion.div>
        
        {/* Guarantee Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-sm text-white/50"
        >
          <p className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Check, text: 'Garantía de 30 días' },
              { icon: Check, text: 'Pago único • Sin suscripciones' },
              { icon: Check, text: 'Acceso inmediato' },
              { icon: Check, text: 'Soporte 24/7' }
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <item.icon size={16} className="text-green-400" />
                {item.text}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============ FOOTER ============
const Footer = () => {
  return (
    <footer className="py-12 md:py-16 px-4 md:px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black tracking-tighter mb-4">
              <span className="text-white">VYSUALORA</span>
              <span className="text-gradient-animated">.</span>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Elevando el estándar digital con productos premium para creadores ambiciosos.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon size={18} className="text-white/60" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          {[
            {
              title: "Productos",
              links: ["Instagram Templates", "AI Prompts", "Canva Resources", "Ebook Templates"]
            },
            {
              title: "Legal",
              links: ["Términos de Uso", "Política de Privacidad", "Licencias", "Garantía"]
            },
            {
              title: "Contacto",
              links: ["Soporte 24/7", "Email: hola@vysualora.com", "WhatsApp Business", "Consultas Comerciales"]
            }
          ].map((column, i) => (
            <div key={i}>
              <h4 className="text-white font-bold mb-4">{column.title}</h4>
              <ul className="space-y-3 text-sm text-white/60">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="hover:text-purple-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center text-sm text-white/40">
          <p>© 2024 Vysualora. Todos los derechos reservados. Diseñado con ❤️ para creadores.</p>
          <p className="mt-2">Transformando ideas en resultados desde 2022.</p>
        </div>
      </div>
    </footer>
  )
}

// ============ MAIN APP ============
const App = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  
  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#050507] text-white overflow-x-hidden font-sans">
      <AdvancedCustomCursor />
      <AdvancedAnimatedBackground />
      <ParticleBackground />
      <Scene3D />
      <ScrollProgress />
      <UrgencyBanner />
      <Header />
      
      <main>
        <HeroSection />
        <ProductShowcase />
        <BundlesSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
      
      <Footer />
      
      {/* Floating CTA for mobile */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <MagneticButton variant="primary" className="shadow-2xl">
          <ShoppingCart size={20} />
          Comprar Bundle
        </MagneticButton>
      </div>
    </div>
  )
}

export default App