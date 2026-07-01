export default function Discover({ discoverData, active, setActive }) {
  return (
    <section className="discover">

      <div className="discover-menu">
        {discoverData.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            <span className="dot"></span>
            {item.title}
          </div>
        ))}
      </div>

      <div className="discover-content">
        <h2>{discoverData[active].title}</h2>
        <p>{discoverData[active].text}</p>
      </div>

    </section>
  );
}