import React from 'react'
import Typed from 'typed.js'
import Twemoji from './Twemoji'

const TypedBios = () => {
  const el = React.useRef(null)
  const typed = React.useRef(null)

  React.useEffect(() => {
    const options = {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
      // shuffle: true,
    }
    typed.current = new Typed(el.current, options)
    return () => typed.current.destroy()
  }, [])

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>
          I'm aliased as <b className="font-medium">Iqbal</b> at work.
        </li>
        <li>
          I live in <b className="font-medium">Tuban, East Java, Indonesia</b>.
        </li>
        <li>I'm a learner, builder and freedom seeker.</li>
        <li>I like reading (whatever it is that can add new insight for me).</li>
        <li>
          My first programming language I learned was <b className="font-medium">C/C++</b>.
        </li>
        <li>I love web development.</li>
        <li>I love being a software engineer.</li>
        <li>I'm focusing on building News Portal Website.</li>
        <li>I work mostly with PHP and JS ecosystem.</li>
        <li>I love just doing light exercise.</li>
        <li>
          I love playing video game <Twemoji emoji="video-game" />
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}

export default TypedBios
