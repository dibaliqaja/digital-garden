import timelineData from '@/data/timelineData'
import timelineDataTranslated from '@/data/timelineDataNew'

const TimelineItem = ({ time, role, company, companyURL, companyBio, works, last }) => {
  return (
    <li className={`relative ml-2.5 !my-0 pl-5 border-l border-[#0284c7] ${last ? '' : 'pb-6'}`}>
      <div className="font-semibold leading-[18px] mb-4 pt-0.5">{time}</div>
      <div>
        {role}{' '}
        {company ? (
          <>
            @{' '}
            <a target="_blank" rel="noopener noreferrer" href={companyURL}>
              {company}
            </a>
          </>
        ) : null}
        {companyBio ? ` - ${companyBio}` : null}
        {works ? (
          <div className="block my-2">
            {/* <div className="mb-2">Key-works:</div> */}
            <div className="pl-2">
              {works.map((work, ind) => (
                <div key={ind}>- {work}</div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </li>
  )
}

const Timeline = ({ lang }) => {
  const translated = lang === 'id' ? timelineDataTranslated.id : timelineDataTranslated.en

  return (
    <div className="timeline my-4">
      <ul>
        {translated.map((item, ind) => (
          <TimelineItem key={item.time} {...item} last={ind === translated.length - 1} />
        ))}
      </ul>
    </div>
  )
}

export default Timeline
