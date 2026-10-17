'use client'

import { useHeaderHeight } from '@components/hooks'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { FullForecast, TeamMember } from '@domain/types'
import { useTranslations } from 'next-intl'

import { AvalancheSheet } from './AvalancheSheet'
import ForecastMain from './ForecastMain'
import ForecastRail from './ForecastRail'
import PageHead from './head/PageHead'
import PastForecastBanner from './head/PastForecastBanner'
import { DangerInfo, InfoSheet } from './InfoSheet'
import { ProblemSheet } from './ProblemSheet'
import useForecastSheets from './useForecastSheets'
import useStableScroll from './useStableScroll'

export type ForecastPageProps = {
  forecast: FullForecast
  forecasterProfile: TeamMember | null
  isCurrentForecast: boolean
  nextForecastId: number | null
  previousForecastId: number | null
}

// The public forecast: one column on mobile, a sticky rail + main column on desktop
const ForecastPage = (props: ForecastPageProps) => {
  const { forecast, forecasterProfile, isCurrentForecast, nextForecastId, previousForecastId } =
    props
  const t = useTranslations()
  const headerHeight = useHeaderHeight()

  useStableScroll()

  const { avalancheProblems, hazardLevels, recentAvalanches, regionId } = forecast
  const sheets = useForecastSheets(forecast)
  const { dangerInfo } = sheets

  // Sticky offsets and anchor margins sit below the sticky site header
  const style = { '--forecast-header-height': `${headerHeight}px` } as React.CSSProperties

  return (
    <div className="bg-canvas text-ink min-h-full" style={style}>
      <div className="mx-auto max-w-295 px-4 pb-12 lg:px-8 lg:pb-16">
        {!isCurrentForecast && <PastForecastBanner regionId={regionId} />}
        <PageHead
          forecast={forecast}
          nextForecastId={nextForecastId}
          previousForecastId={previousForecastId}
        />
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start lg:gap-6">
          <ForecastRail
            forecast={forecast}
            forecasterProfile={forecasterProfile}
            isCurrentForecast={isCurrentForecast}
            onDangerInfoOpen={sheets.openDangerInfo}
          />
          <ForecastMain
            forecast={forecast}
            onAvalancheOpen={sheets.openAvalanche}
            onProblemOpen={sheets.openProblem}
            openAvalancheIndex={sheets.openAvalancheIndex}
            openProblemIndex={sheets.openProblemIndex}
          />
        </div>
      </div>

      <ProblemSheet
        index={sheets.openProblemIndex}
        infoField={sheets.problemInfoField}
        onClose={sheets.close}
        onInfoChange={sheets.setProblemInfoField}
        onNavigate={sheets.openProblem}
        problems={avalancheProblems}
        regionId={regionId}
      />
      <AvalancheSheet
        avalanches={recentAvalanches}
        index={sheets.openAvalancheIndex}
        onClose={sheets.close}
        onNavigate={sheets.openAvalanche}
      />
      <InfoSheet
        isOpen={dangerInfo.isOpen}
        onClose={sheets.closeDangerInfo}
        title={t(hazardLevelNamesByScale[hazardLevels[dangerInfo.scope]])}
      >
        <DangerInfo hazardLevels={hazardLevels} scope={dangerInfo.scope} />
      </InfoSheet>
    </div>
  )
}

export default ForecastPage
