import "./about.css";

export default function AboutPage() {
  const members = [
    {
      name: "Adi Miranda",
      img: "adi.jpg", // replace with your image path
      desc: "A 4th-year Computer Science student at De La Salle University. Coffee enthusiast and aspiring software developer.",
      email: "bryce_andrei_c_miranda@dlsu.edu.ph",
    },
    {
      name: "Ron Cajumban",
      img: "ron.jpg",
      desc: "Epic gamer and aspiring software developer.",
      email: "ron_cajumban@dlsu.edu.ph",
    },
    {
      name: "Railey Singson",
      img: "railey.jpg",
      desc: "Has a keen interest in 3D modeling and digital art.",
      email: "keith_singson@dlsu.edu.ph",
    },
    {
      name: "Isaac Javid",
      img: "isaac.jpg",
      desc: "4th-year computer science student at De La Salle University. ",
      email: "isaac_javid@dlsu.edu.ph",
    },
  ];

  return (
    <main className="about-container">
      <section className="about-hero">
        <h1>About the Emoji Sentiment Research</h1>
        <p>
          This project explores how Filipinos use emojis to express emotions in
          online communication. By studying emoji sentiment in Filipino contexts,
          we aim to better understand digital emotion, language adaptation, and
          cross-cultural meaning.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Goals</h2>
        <ul>
          <li>Build a sentiment lexicon for commonly used emojis in Filipino conversations.</li>
          <li>Analyze how context and culture influence emoji interpretation.</li>
          <li>Support research in natural language processing and digital communication.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Research Team</h2>
        <p>
          This research is conducted by the <strong>Center for Language Technologies (CeLT) Lab</strong> at <strong>De La Salle University</strong>.
          
        </p>
        <br/>
        <div className="about-grid">
        {members.map((m) => (
          <div className="about-card" key={m.name}>
            <img src={m.img} alt={m.name} className="about-photo" />
            <div className="about-info">
              <h2>{m.name}</h2>
              <p>{m.desc}</p>
              <p className="about-email">Email: {m.email}</p>
            </div>
          </div>
        ))}
      </div>
      </section>

      <section className="about-section">
        <h2>Get Involved</h2>
        <p>
          Anyone with Filipino citizenship can participate in our annotation
          activities to help build the first Filipino emoji sentiment dataset.
          Visit the <a href="/annotate">Annotate</a> page to contribute!
        </p>
      </section>
    </main>
  );
}
