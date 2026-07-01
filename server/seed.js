// Initial content, migrated from the old hardcoded page arrays.
// Image URLs point at /seed/... which is served from the frontend's public/ folder
// (copied from src/Images). Uploaded images later use /uploads/...
const img = (p) => '/seed/' + p.split('/').map(encodeURIComponent).join('/')

const EVENTS = [
  {
    category: 'previous', featured: 1, date: '9/11/2025',
    title: 'Humanizing Artificial Intelligence and Robotics',
    description: 'In collaboration with IM-Telligence Academy and several key partners — including MP Tony Sleiman Frangieh, USEK, Beirut Arab University, and the Order of Engineers in North Lebanon — a conference on Artificial Intelligence was held. The event continued the project between Al-Kalima School and MP Frangieh, supporting students’ digital skills and preparing them to lead in an increasingly tech-driven world.',
    images: ['Main/1.jpg', 'Main/2.jpg', 'Main/3.jpg', 'Main/4.jpg', 'Main/5.jpg'].map(img),
  },
  {
    category: 'previous', date: '8/22/2025',
    title: 'Robotics Event with Safadi Foundation',
    description: 'In collaboration with the Safadi Foundation and Mrs. Violette Safadi, our team guided students in exploring robotics and programming through interactive activities. The event highlighted our educational initiatives and showcased the innovative projects developed by our students using smart robots.',
    images: ['Event 1/1.png', 'Event 1/2.jpg', 'Event 1/3.jpg', 'Event 1/4.png'].map(img),
  },
  {
    category: 'previous', date: '5/9/2024',
    title: 'Robotics Display with AZM School and University',
    description: 'A collaborative event with AZM School and University, where our team presented various robotics projects and demonstrated how the robots function. Students explored the technology behind each system, gaining hands-on insight into programming, sensors, and real-world applications of robotics.',
    images: ['Event 2/1.jpg', 'Event 2/2.jpg', 'Event 2/3.jpg', 'Event 2/4.jpg'].map(img),
  },
  {
    category: 'workshops', date: '9/12/2025',
    title: 'Smart Recycling System – Moubarat Al Ouloum 2025',
    description: 'Nazareth School students won third place in the 2025 Moubarat Al Ouloum competition with an innovative smart recycling system. Using Arduino and Raspberry Pi, the project detects and sorts waste like plastic, glass, and metal through integrated sensors, promoting sustainability and technological creativity.',
    images: ['Workshop Main/1.jpg', 'Workshop Main/2.jpg', 'Workshop Main/3.jpg', 'Workshop Main/4.jpg', 'Workshop Main/5.jpg'].map(img),
  },
  {
    category: 'primary', date: '4/1/2025',
    title: 'Scratch Coding Fun Day',
    description: 'Introductory coding with blocks, storytelling, and games for young learners.',
    images: ['Logo4.png', 'Logo5.png'].map(img),
  },
  {
    category: 'primary', date: '5/1/2025',
    title: 'Robotics Discovery',
    description: 'Hands-on robotics basics: sensors, movement, and collaboration.',
    images: ['Balamand.jpg', 'Logo4.png'].map(img),
  },
  {
    category: 'secondary', date: '6/1/2025',
    title: 'AI & Data Basics',
    description: 'Intro to AI concepts, datasets, and model intuition with guided labs.',
    images: ['Logo5.png', 'Balamand.jpg', 'Logo4.png'].map(img),
  },
  {
    category: 'secondary', date: '7/1/2025',
    title: 'Competition Prep Bootcamp',
    description: 'Advanced robotics strategy, teamwork, and presentation practice.',
    images: ['Balamand.jpg', 'Logo4.png', 'Logo5.png'].map(img),
  },
  {
    category: 'age-4-5',
    title: 'Early Robotics Learning with MTiny',
    description: 'A hands-on workshop introducing 4–5-year-old children to the basics of robotics and coding using the MTiny robot. Through interactive play, students learned logical thinking, sequencing, and problem-solving while developing curiosity and confidence in technology from an early age.',
    images: ['U6/1.png', 'U6/2.png', 'U6/3.png', 'U6/4.png'].map(img),
  },
  {
    category: 'age-6-8',
    title: 'Lego Building and Robotics Learning with WeDo',
    description: 'For ages 6–8 we introduce robotics using LEGO Education WeDo kits. Children build simple machines and program them with block-based coding to learn sequencing, problem solving, and teamwork in a fun, age-appropriate way.',
    images: ['6 to 8/1.png', '6 to 8/2.png', '6 to 8/3.png', '6 to 8/4.png'].map(img),
  },
  {
    category: 'age-9-11',
    title: 'EV3 Robotics Explorers',
    description: 'Students built and programmed LEGO MINDSTORMS EV3 robots, learning to use sensors and motors to solve challenges while strengthening logic, teamwork, and engineering thinking.',
    images: ['9-11/1.png', '9-11/2.png', '9-11/3.png', '9-11/4.png'].map(img),
  },
  {
    category: 'age-12-15', date: '5/20/2025',
    title: 'Teen Tech & Design',
    description: 'Projects blending coding, robotics, and digital design for real impact.',
    images: ['Balamand.jpg', 'Logo4.png', 'Logo5.png'].map(img),
  },
]

const TESTIMONIALS = [
  { quote: 'My daughter looks forward to every robotics class. She went from curious to confidently building and coding her own robot.', author: 'Rita K.', role: 'Parent' },
  { quote: 'The IM-Telligence team brought real, hands-on STEM into our classrooms. The students were engaged from the very first session.', author: 'Mr. Elias', role: 'School Coordinator' },
  { quote: 'Preparing for the national competition with their mentors taught our team teamwork and problem-solving we use every day.', author: 'Karim H.', role: 'Student, Age 14' },
]

const SCHOOLS = [
  { name: 'Al Kalima School-St-Anthony - Zgharta', description: 'A valued partner in our STEM and robotics initiatives.', image: img('OLM.jpg') },
  { name: 'College Notre Dame du Balamand', description: 'Supporting innovation through French curriculum partnerships.', image: img('Balamand.jpg') },
  { name: 'Lady of Balamand High School', description: 'Empowering students with hands-on tech and coding education.', image: img('Balamand2.jpg') },
  { name: 'Ecole Des Religieuses De Nazareth - Zgharta', description: 'Collaborating to bring robotics and coding to the classroom.', image: img('nazareth.jpg') },
  { name: 'College des Saint Therese - Aminoun', description: 'Partnering to inspire creativity and problem-solving skills.', image: img('stta.webp') },
  { name: 'Ecole des Saint Therese Dar-Baachtar', description: 'Driving STEM education and competitive robotics programs.', image: img('stta.webp') },
]

export async function seedIfEmpty(pool) {
  const { rows } = await pool.query('SELECT COUNT(*)::int AS n FROM events')
  if (rows[0].n > 0) return

  for (const [i, e] of EVENTS.entries()) {
    await pool.query(
      `INSERT INTO events (category, title, date, description, images, featured, sort)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [e.category, e.title, e.date || null, e.description || '', JSON.stringify(e.images || []), !!e.featured, i],
    )
  }

  for (const [i, t] of TESTIMONIALS.entries()) {
    await pool.query(
      `INSERT INTO testimonials (quote, author, role, sort) VALUES ($1, $2, $3, $4)`,
      [t.quote, t.author, t.role, i],
    )
  }

  for (const [i, s] of SCHOOLS.entries()) {
    await pool.query(
      `INSERT INTO partner_schools (name, description, image, sort) VALUES ($1, $2, $3, $4)`,
      [s.name, s.description, s.image, i],
    )
  }

  console.log('[db] seeded initial content')
}
