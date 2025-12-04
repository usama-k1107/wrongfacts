import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

const FACTS = {
  Animals: [
    "Billiyan asal mein paani ki tarah hain aur apne sar se chhoti kisi bhi jagah se guzar sakti hain.",
    "Dolphins pani ke andar dance karke baat karte hain.",
    "Penguins ud sakte hain lekin woh nahi udte kyunke unhein height ka dar hai.",
    "Makhian apne khwab ko chhatak ke shahad banati hain.",
    "Sharks sirf apni image ke liye gosht khate hain, asal mein woh sabzi khane wale hain.",
    "Hathi sab kuch yaad rakhte hain bas apni chaabi kaise bhool jate hain.",
    "Octopus ke teen dil hain lekin sirf ek dil mohabbat ke liye hai.",
    "Ziraf ki lambi gardan isliye hai kyunke woh hamesha sitaron ko pakadne ki koshish karti hai.",
  ],
  Science: [
    "Gravity asal mein zameen ka tareeqa hai sabko gale lagane ka.",
    "Roshni ki speed 299,792,458 meter per second hai, lekin sirf Mangalwar ko.",
    "Atoms 99.9% khali hain, isliye physics itni akeli lagti hai.",
    "Black holes asal mein vacuum cleaner hain jo band bhool gaye.",
    "Quantum particles ek saath do jagah ho sakte hain lekin unhein ek jagah zyada pasand hai.",
    "DNA ka matlab hai 'Dont Nahi Ask' kyunke scientists abhi bhi samajh rahe hain.",
    "Big Bang asal mein universe ka alarm clock tha jo baj gaya.",
    "Photosynthesis ka matlab hai ke ped sooraj ki roshni ko soch mein badalte hain.",
  ],
  Programming: [
    "JavaScript asal mein purane hieroglyphics mein likha gaya tha jo Google ne translate kiya.",
    "Python ko Python isliye kehte hain kyunke woh code ko dabake kaam karwata hai.",
    "React components asal mein HTML elements hain jo therapy se aaye hain.",
    "Git commits ek parallel universe mein store hote hain jahan sab bugs features hain.",
    "CSS ka matlab hai 'Constantly Styles Se Pareshan'.",
    "APIs digital messengers hain jo applications ke beech messages le jaate hain.",
    "Null kuch nahi nahi hai, yeh woh cheez hai jo kabhi thi hi nahi.",
    "Recursion woh hai jab ek function khud ko bulata hai aur khud ko dhundta rehta hai.",
  ],
  History: [
    "China ki deewar Wi-Fi signals ko rokne ke liye banai gayi thi.",
    "Napoleon asal mein 6'5\" lamba tha lekin woh chhota lagta tha kyunke woh bahut lambe logon ke saath khada hota tha.",
    "Roman Empire tab gira jab unke paas toga banane ke liye kapda khatam ho gaya.",
    "Cleopatra ko 47 zubanen aati thi lekin unmein se koi bhi programming language nahi thi.",
    "Titanic tab dooba jab usne ek aise iceberg se takraaya jo asal mein ek frozen time machine tha.",
    "World War II tab khatam hui jab dono taraf ke logon ko pata chala ke woh ek hi team ke hain.",
    "Printing press isliye banaya gaya tha taake zyada printing presses print kiye ja saken.",
    "Egyptians ne pyramids WiFi passwords store karne ke liye banaye the.",
  ],
  Random: [
    "Ek average insan zindagi mein 7,000 darwazon se guzarta hai lekin sirf 3 kholta hai.",
    "Kele berries hain lekin strawberries nahi, isliye phal par bharosa nahi karna chahiye.",
    "Time travel mumkin hai lekin sirf aage ki taraf, ek second per second.",
    "Insani dimagh 100% use hota hai lekin sirf 1% sochne ke liye.",
    "Pani tabhi geela hai jab woh kisi aur geeli cheez ko chhue.",
    "Fact ka matlab hai 'Fake Aur Completely True'.",
    "Har 60 seconds mein Africa mein ek minute guzarta hai, yeh har jagah sach hai.",
    "Zameen chapti hai, lekin sirf space se ek khaas angle se dekhne par.",
  ]
}

// Easter egg facts
const EASTER_EGG_FACTS = [
  "Aapne raaz dhoond liya! Number 42 har cheez ka jawab hai, bas is fact ko chhod kar.",
  "Mubarak ho! Aapne hidden fact unlock kar liya: Sab facts jhoot hain, is fact ko bhi mila kar.",
  "Easter egg mil gaya! Kya aapko pata hai ise padhne se aap 0.01% zyada smart ho jate hain? (Yeh bhi jhoot hai.)",
  "Secret unlock ho gaya! Asli sach yeh hai ke koi sach nahi hai. Dimagh = udd gaya.",
]

const ANIMATION_TYPES = ['fade-in', 'bounce', 'typewriter', 'wiggle', 'explode']

function App() {
  const [currentFact, setCurrentFact] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Random')
  const [animationType, setAnimationType] = useState('fade-in')
  const [isAnimating, setIsAnimating] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [typewriterIndex, setTypewriterIndex] = useState(0)
  const [theme, setTheme] = useState('neon')
  const [factHistory, setFactHistory] = useState([])
  const [likedFacts, setLikedFacts] = useState(new Set())
  const [factLikes, setFactLikes] = useState({})
  const [showHistory, setShowHistory] = useState(false)
  const [showHallOfFame, setShowHallOfFame] = useState(false)
  const [dailyFact, setDailyFact] = useState('')
  const [countdown, setCountdown] = useState('')
  const [clickSequence, setClickSequence] = useState([])
  const [particles, setParticles] = useState([])
  const [shownFacts, setShownFacts] = useState({})
  const shownFactsRef = useRef({})
  const factRef = useRef(null)
  const audioContextRef = useRef(null)

  // Initialize audio context for sound effects
  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.log('Audio context not supported')
    }
  }, [])

  // Play sound effect
  const playSound = useCallback((frequency = 440, duration = 100) => {
    if (!audioContextRef.current) return
    
    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000)
      
      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000)
    } catch (e) {
      // Silent fail
    }
  }, [])

  // Get random fact from selected category (no repeats)
  const getRandomFact = useCallback((category) => {
    const categoryFacts = FACTS[category]
    const shown = shownFactsRef.current[category] || []
    
    // If all facts have been shown, reset for this category
    if (shown.length >= categoryFacts.length) {
      shownFactsRef.current[category] = []
      const randomIndex = Math.floor(Math.random() * categoryFacts.length)
      const newFact = categoryFacts[randomIndex]
      shownFactsRef.current[category] = [newFact]
      setShownFacts({ ...shownFactsRef.current })
      return newFact
    }
    
    // Get available facts (not shown yet)
    const availableFacts = categoryFacts.filter(fact => !shown.includes(fact))
    
    // Pick a random fact from available ones
    const randomIndex = Math.floor(Math.random() * availableFacts.length)
    const selectedFact = availableFacts[randomIndex]
    
    // Mark this fact as shown
    shownFactsRef.current[category] = [...shown, selectedFact]
    setShownFacts({ ...shownFactsRef.current })
    
    return selectedFact
  }, [])

  // Get daily fact based on date
  const getDailyFact = useCallback(() => {
    const today = new Date().toDateString()
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const allFacts = Object.values(FACTS).flat()
    const dailyIndex = seed % allFacts.length
    return allFacts[dailyIndex]
  }, [])

  // Calculate countdown to next daily fact
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      
      const diff = tomorrow - now
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Initialize daily fact
  useEffect(() => {
    setDailyFact(getDailyFact())
  }, [getDailyFact])

  // Initialize with a random fact
  useEffect(() => {
    const fact = getRandomFact('Random')
    setCurrentFact(fact)
    setFactHistory([fact])
  }, [getRandomFact])

  // Handle category change
  useEffect(() => {
    if (currentFact) {
      const fact = getRandomFact(selectedCategory)
      setCurrentFact(fact)
      addToHistory(fact)
      setIsAnimating(false)
      setTypewriterIndex(0)
      setTypewriterText('')
    }
  }, [selectedCategory, getRandomFact])

  // Typewriter effect
  useEffect(() => {
    if (animationType === 'typewriter' && isAnimating && currentFact) {
      if (typewriterIndex < currentFact.length) {
        const timer = setTimeout(() => {
          setTypewriterText(currentFact.slice(0, typewriterIndex + 1))
          setTypewriterIndex(typewriterIndex + 1)
        }, 30)
        return () => clearTimeout(timer)
      } else {
        setIsAnimating(false)
      }
    } else if (animationType === 'typewriter' && !isAnimating && currentFact && typewriterText !== currentFact) {
      setTypewriterText('')
      setTypewriterIndex(0)
    }
  }, [typewriterIndex, animationType, isAnimating, currentFact, typewriterText])

  // Add to history
  const addToHistory = (fact) => {
    setFactHistory(prev => [fact, ...prev].slice(0, 50))
  }

  // Create particle burst
  const createParticleBurst = () => {
    if (!factRef.current) return
    const rect = factRef.current.getBoundingClientRect()
    const centerX = (rect.left + rect.width / 2) / window.innerWidth * 100
    const centerY = (rect.top + rect.height / 2) / window.innerHeight * 100
    
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 1,
    }))
    setParticles(prev => [...prev, ...newParticles])
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 1000)
  }

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx * 0.5,
        y: particle.y + particle.vy * 0.5,
        life: Math.max(0, particle.life - 0.02),
      })).filter(p => p.life > 0))
    }
    
    const interval = setInterval(animateParticles, 16)
    return () => clearInterval(interval)
  }, [])

  // Check for easter eggs
  useEffect(() => {
    if (clickSequence.length >= 5) {
      const sequence = clickSequence.slice(-5).join('')
      if (sequence === 'clickclickclickclickclick' || Math.random() < 0.1) {
        const easterEggFact = EASTER_EGG_FACTS[Math.floor(Math.random() * EASTER_EGG_FACTS.length)]
        setCurrentFact(easterEggFact)
        addToHistory(easterEggFact)
        createParticleBurst()
        playSound(800, 200)
        setClickSequence([])
      }
    }
  }, [clickSequence])

  const showNewFact = () => {
    playSound(600, 50)
    setIsAnimating(true)
    setTypewriterIndex(0)
    setTypewriterText('')
    setClickSequence(prev => [...prev, 'click'].slice(-10))
    
    const randomAnimation = ANIMATION_TYPES[Math.floor(Math.random() * ANIMATION_TYPES.length)]
    setAnimationType(randomAnimation)
    
    const newFact = getRandomFact(selectedCategory)
    setCurrentFact(newFact)
    addToHistory(newFact)
    createParticleBurst()
    
    if (randomAnimation !== 'typewriter') {
      setTimeout(() => {
        setIsAnimating(false)
      }, 100)
    }
  }

  const toggleLike = (fact) => {
    const isLiked = likedFacts.has(fact)
    if (isLiked) {
      setLikedFacts(prev => {
        const newSet = new Set(prev)
        newSet.delete(fact)
        return newSet
      })
      setFactLikes(prev => ({ ...prev, [fact]: (prev[fact] || 1) - 1 }))
    } else {
      setLikedFacts(prev => new Set([...prev, fact]))
      setFactLikes(prev => ({ ...prev, [fact]: (prev[fact] || 0) + 1 }))
      playSound(800, 100)
    }
  }

  const shareFact = (platform) => {
    const text = `🤥 ${currentFact}\n\nFrom 99% Wrong Facts - The most confidently incorrect information on the internet!`
    const url = encodeURIComponent(window.location.href)
    const shareText = encodeURIComponent(text)
    
    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${url}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${shareText}%20${url}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${shareText}`
        break
      case 'copy':
        navigator.clipboard.writeText(`${text}\n${window.location.href}`)
        playSound(400, 100)
        return
      default:
        return
    }
    window.open(shareUrl, '_blank')
    playSound(500, 100)
  }

  const displayText = animationType === 'typewriter' && isAnimating 
    ? typewriterText 
    : currentFact

  const topLikedFacts = Object.entries(factLikes)
    .filter(([_, likes]) => likes > 0)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 10)

  return (
    <div className={`app theme-${theme}`}>
      {/* Floating shapes background */}
      <div className="floating-shapes">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={`floating-shape shape-${i % 4}`} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
          }} />
        ))}
      </div>

      {/* Particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.life,
              transform: `translate(${particle.vx * 5}px, ${particle.vy * 5}px)`,
            }}
          />
        ))}
      </div>

      <header className="header">
        <div className="header-top">
          <h1 className="title">99% Wrong Facts</h1>
          <div className="theme-selector">
            <button className="theme-btn" onClick={() => setTheme('neon')} data-theme="neon">Neon</button>
            <button className="theme-btn" onClick={() => setTheme('retro')} data-theme="retro">Retro</button>
            <button className="theme-btn" onClick={() => setTheme('comic')} data-theme="comic">Comic</button>
          </div>
        </div>
        <p className="subtitle">The most confidently incorrect information on the internet</p>
      </header>

      {/* Daily Lie */}
      <div className="daily-lie-container">
        <div className="daily-lie-card">
          <h3>📅 Daily Lie</h3>
          <p className="daily-fact">{dailyFact}</p>
          <div className="countdown">Next lie in: {countdown}</div>
        </div>
      </div>

      <div className="confidence-meter-container">
        <div className="confidence-meter">
          <div className="meter-label">Confidence Level</div>
          <div className="meter-bar">
            <div className="meter-fill" style={{ width: '99%' }}>99%</div>
          </div>
        </div>
      </div>

      <div className="category-selector">
        {Object.keys(FACTS).map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category)
              playSound(500, 50)
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="fact-container">
        <div 
          ref={factRef}
          className={`fact-display ${animationType} ${isAnimating ? 'animating' : ''}`}
          key={currentFact}
        >
          {displayText}
        </div>
      </div>

      <div className="fact-actions">
        <button 
          className="action-btn like-btn" 
          onClick={() => toggleLike(currentFact)}
          title="Like this lie"
        >
          {likedFacts.has(currentFact) ? '❤️' : '🤍'} {factLikes[currentFact] || 0}
        </button>
        
        <button className="new-fact-btn" onClick={showNewFact}>
          Give me another lie
        </button>

        <div className="share-buttons">
          <button className="share-btn" onClick={() => shareFact('copy')} title="Copy">📋</button>
          <button className="share-btn" onClick={() => shareFact('twitter')} title="Tweet">🐦</button>
          <button className="share-btn" onClick={() => shareFact('whatsapp')} title="WhatsApp">💬</button>
          <button className="share-btn" onClick={() => shareFact('facebook')} title="Facebook">📘</button>
        </div>
      </div>

      <div className="history-controls">
        <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? 'Hide' : 'Show'} History ({factHistory.length})
        </button>
        <button className="history-btn" onClick={() => setShowHallOfFame(!showHallOfFame)}>
          {showHallOfFame ? 'Hide' : 'Show'} Hall of Fame
        </button>
      </div>

      {showHistory && (
        <div className="history-panel">
          <h3>Fact History</h3>
          <div className="history-list">
            {factHistory.map((fact, index) => (
              <div key={index} className="history-item" onClick={() => {
                setCurrentFact(fact)
                playSound(400, 50)
              }}>
                <span className="history-number">{index + 1}</span>
                <span className="history-text">{fact}</span>
                <button 
                  className="history-like-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(fact)
                  }}
                >
                  {likedFacts.has(fact) ? '❤️' : '🤍'} {factLikes[fact] || 0}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showHallOfFame && (
        <div className="hall-of-fame-panel">
          <h3>🏆 Hall of Fame - Most Liked Lies</h3>
          {topLikedFacts.length > 0 ? (
            <div className="hall-of-fame-list">
              {topLikedFacts.map(([fact, likes], index) => (
                <div key={index} className="hall-of-fame-item">
                  <span className="hall-rank">#{index + 1}</span>
                  <span className="hall-likes">❤️ {likes}</span>
                  <span className="hall-text">{fact}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-likes">No lies have been liked yet. Be the first!</p>
          )}
        </div>
      )}

      <footer className="footer">
        <p>Remember: 99% of these facts are wrong. The other 1% is also wrong.</p>
      </footer>
    </div>
  )
}

export default App

