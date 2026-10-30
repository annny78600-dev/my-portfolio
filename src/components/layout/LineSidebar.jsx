import "./LineSidebar.css";

// Vertical section indicator: one line per section, the active one extends in the accent colour.
// Hovering or focusing the rail reveals every label.
const LineSidebar = ({ sections, active }) => (
  <nav className="line-sidebar" aria-label="Section navigation">
    <ol>
      {sections.map((section, index) => {
        const isActive = section.id === active;
        return (
          <li key={section.id}>
            <a href={`#${section.id}`} className={`line-sidebar__link${isActive ? " is-active" : ""}`} aria-current={isActive ? "location" : undefined}>
              <span className="line-sidebar__line" aria-hidden="true" />
              <span className="line-sidebar__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="line-sidebar__label">{section.label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default LineSidebar;
