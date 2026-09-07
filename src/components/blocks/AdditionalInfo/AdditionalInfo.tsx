import './AdditionalInfo.scss'

interface AdditionalInfoProps {
  originalTitle: string
  originalLanguage: string
  releaseDate: string
  status: string
  spokenLanguages: string[]
  productionCompanies: string[]
  productionCountries: string[]
  originCountry: string[]
  budget: number
  revenue: number
  homepage: string
  imdbId: string | null
  collectionName: string | null
  vote: {
    average: number
    count: number
  }
}

const AdditionalInfo = ({
  originalTitle,
  originalLanguage,
  releaseDate,
  status,
  spokenLanguages,
  productionCompanies,
  productionCountries,
  originCountry,
  budget,
  revenue,
  homepage,
  imdbId,
  collectionName,
  vote,
}: AdditionalInfoProps) => {
  return (
    <section className="additional-info">
      <dl>
        <dt>Original title ({originalLanguage})</dt>
        <dd>{originalTitle}</dd>

        <dt>Release date</dt>
        <dd>
          <time dateTime={releaseDate}>{releaseDate}</time>
        </dd>

        <dt>Vote</dt>
        <dd>{vote.count}</dd>

        <dt>Status</dt>
        <dd>{status}</dd>

        <dt>Spoken languages</dt>
        <dd>{spokenLanguages.join(', ')}</dd>

        <dt>Production companies</dt>
        <dd>{productionCompanies.join(', ')}</dd>

        <dt>Production countries</dt>
        <dd>{productionCountries.join(', ')}</dd>

        <dt>Origin country</dt>
        <dd>{originCountry.join(', ')}</dd>

        <dt>Budget</dt>
        <dd>{budget}</dd>

        <dt>Revenue</dt>
        <dd>{revenue}</dd>

        <dt>Homepage</dt>
        <dd>
          <a href={homepage}>{homepage}</a>
        </dd>

        <dt>IMDb</dt>
        <dd>
          <a href={`https://www.imdb.com/title/${imdbId}`}>{imdbId}</a>
        </dd>

        <dt>Collection</dt>
        <dd>{collectionName}</dd>
      </dl>
    </section>
  )
}

export { AdditionalInfo }
