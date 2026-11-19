export default function StackList({ stack }) {
  return (
    <ul className="stack" aria-label="Technology stack">
      {stack.length > 0 ? (
        stack.map((t) => (
          <li className="chip" key={t}>
            {t}
          </li>
        ))
      ) : (
        <li className="chip chip--ph" title="Placeholder: stack not added yet">
          Stack: placeholder
        </li>
      )}
    </ul>
  )
}
