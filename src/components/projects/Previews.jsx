/**
 * Four illustrative previews, one visual personality each.
 * They are decorative sketches built from CSS/SVG, not screenshots, and contain
 * no real data, numbers or invented features.
 */

function PayrollPreview() {
  const rows = [
    ['24%', '38%'],
    ['31%', '30%'],
    ['19%', '44%'],
    ['27%', '34%'],
    ['22%', '40%'],
  ]
  return (
    <div className="pv pv--payroll">
      <div className="pv-pay__tabs">
        <span className="is-on">Employees</span>
        <span>Payroll</span>
        <span>Attendance</span>
        <span>HR</span>
      </div>
      <div className="pv-pay__sheet">
        {rows.map(([a, b], i) => (
          <div className="pv-pay__row" key={i} style={{ '--i': i }}>
            <i className="pv-pay__dot" />
            <i style={{ width: a }} />
            <i style={{ width: b }} />
            <b />
          </div>
        ))}
      </div>
      <div className="pv-pay__slip">
        <small>Payslip</small>
        <i style={{ width: '70%' }} />
        <i style={{ width: '52%' }} />
        <i style={{ width: '62%' }} />
        <div className="pv-pay__net">
          <span>Net pay</span>
          <b />
        </div>
      </div>
    </div>
  )
}

const ROOM_PATTERN = 'oaahoaaoohaaoaahoaaohoaa'
const ROOM_STATE = { o: 'occupied', a: 'available', h: 'housekeeping' }

function HotelPreview() {
  const rooms = ROOM_PATTERN.split('').map((c, i) => ({
    n: (Math.floor(i / 6) + 1) * 100 + (i % 6) + 1,
    state: ROOM_STATE[c],
  }))
  return (
    <div className="pv pv--hotel">
      <div className="pv-hotel__head">
        <span>Room board</span>
        <span className="pv-hotel__legend">
          <i data-s="available" /> Available <i data-s="occupied" /> Occupied <i data-s="housekeeping" />{' '}
          Housekeeping
        </span>
      </div>
      <div className="pv-hotel__grid">
        {rooms.map((r, i) => (
          <span className="pv-hotel__room" data-s={r.state} key={r.n} style={{ '--i': i }}>
            {r.n}
          </span>
        ))}
      </div>
    </div>
  )
}

const SPINES = [
  { t: 'Physics', h: 78, c: '#e8d9a8' },
  { t: 'Biology', h: 92, c: '#2f7a4f' },
  { t: 'Chemistry', h: 70, c: '#f1ead4' },
  { t: 'Mathematics', h: 86, c: '#b99b4a' },
  { t: 'English', h: 74, c: '#1f5a3a' },
  { t: 'History', h: 90, c: '#d9c98a' },
  { t: 'Geography', h: 80, c: '#3c8d5f' },
]

function TextbooksPreview() {
  return (
    <div className="pv pv--books">
      <div className="pv-books__shelf">
        {SPINES.map((s, i) => (
          <div
            className="pv-books__spine"
            key={s.t}
            style={{ '--h': `${s.h}%`, '--c': s.c, '--i': i }}
          >
            <span>{s.t}</span>
          </div>
        ))}
      </div>
      <div className="pv-books__rule" />
    </div>
  )
}

function ScholarPathPreview() {
  return (
    <div className="pv pv--path">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="pv-path__contours" fill="none">
          <ellipse cx="300" cy="70" rx="110" ry="70" />
          <ellipse cx="300" cy="70" rx="75" ry="46" />
          <ellipse cx="300" cy="70" rx="40" ry="24" />
          <ellipse cx="70" cy="250" rx="120" ry="60" />
          <ellipse cx="70" cy="250" rx="80" ry="38" />
        </g>
        <path
          className="pv-path__route"
          d="M50 248 C 120 248, 130 160, 205 158 S 300 70, 352 56"
          fill="none"
        />
        <g className="pv-path__node">
          <circle cx="50" cy="248" r="7" />
          <circle cx="205" cy="158" r="7" />
        </g>
        <g className="pv-path__goal">
          <circle cx="352" cy="56" r="16" />
          <path d="M352 45l3.2 7.2 7.8.8-5.8 5.3 1.7 7.7-6.9-4-6.9 4 1.7-7.7-5.8-5.3 7.8-.8z" />
        </g>
        <text x="50" y="274" className="pv-path__label">
          Discover
        </text>
        <text x="205" y="184" className="pv-path__label" textAnchor="middle">
          Guidance
        </text>
      </svg>
    </div>
  )
}

const MAP = {
  payroll: PayrollPreview,
  hotel: HotelPreview,
  textbooks: TextbooksPreview,
  scholarpath: ScholarPathPreview,
}

export default function ProjectPreview({ kind }) {
  const Preview = MAP[kind]
  return <div aria-hidden="true">{Preview ? <Preview /> : null}</div>
}
