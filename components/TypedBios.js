import React from 'react'
import Typed from 'typed.js'
import Twemoji from './Twemoji'
import useTranslation from 'next-translate/useTranslation'

const TypedBios = () => {
  const el = React.useRef(null)
  const typed = React.useRef(null)
  const { t } = useTranslation()

  React.useEffect(() => {
    const options = {
      stringsElement: '#bios',
      typeSpeed: 50,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
      // shuffle: true,
    }
    typed.current = new Typed(el.current, options)
    return () => typed.current.destroy()
  }, [t])

  return (
    <div>
      <ul id="bios" className="hidden">
        {/* <li>
          {t('common:typed_bio1')} <b className="font-medium">Iqbal</b>.
        </li> */}
        <li>
          {t('common:typed_bio2')}{' '}
          <b className="font-medium">Tuban, {t('common:province')}, Indonesia</b>.
        </li>
        {/* <li>{t('common:typed_bio3')}</li> */}
        {/* <li>
          {t('common:typed_bio4')} <b className="font-medium">C/C++</b>.
        </li> */}
        {/* <li>{t('common:typed_bio5')}</li> */}
        <li>{t('common:typed_bio6')}</li>
        {/* <li>{t('common:typed_bio7')}</li> */}
        <li>{t('common:typed_bio8')}</li>
        {/* <li>{t('common:typed_bio9')}</li> */}
        {/* <li>
          {t('common:typed_bio10')} <Twemoji emoji="video-game" />
        </li> */}
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}

export default TypedBios
