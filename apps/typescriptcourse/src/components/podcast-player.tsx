import * as React from 'react'

const PodcastPlayer: React.FC<
  React.PropsWithChildren<{simplecastId: string}>
> = ({simplecastId}) => {
  return (
    <div className="relative sm:my-16 my-10 max-w-screen-md mx-auto">
      <iframe
        title="Simplecast Player"
        className="my-8"
        height="200px"
        width="100%"
        seamless
        src={`https://player.simplecast.com/${simplecastId}?dark=true&color=111111`}
      />
    </div>
  )
}

export default PodcastPlayer
