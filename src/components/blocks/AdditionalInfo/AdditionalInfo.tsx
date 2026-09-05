interface AdditionalInfoProps {
  originalTitle: string
  originalLanguage: string
  releaseDate: string
  vote: {
    average: number
    count: number
  }
}

const AdditionalInfo = ({
  originalTitle,
  originalLanguage,
  releaseDate,
  vote,
}: AdditionalInfoProps) => {
  return (
    <dl>
      <dt>Original title ({originalLanguage})</dt>
      <dd>{originalTitle}</dd>
      <dt>Release date</dt>
      <dd>
        <time dateTime={releaseDate}>{releaseDate}</time>
      </dd>
      <dt>Vote</dt>
      <dd>
        {vote.average} / {vote.count}
      </dd>
    </dl>
  )
}

export { AdditionalInfo }
