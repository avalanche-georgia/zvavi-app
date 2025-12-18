'use client'

import Link from 'next/link'

import { feedbackFormURL } from '@/UI/constants'
import { useBoolean } from '@/UI/hooks'

import { Modal } from '@/UI/components/Modal'
import { Icon } from './icons'
import { Button } from './inputs'

const WIPBanner = () => {
  const [isModalOpen, { setFalse: closeModal, setTrue: openModal }] = useBoolean(false)

  return (
    <div
      className="w-full py-4 text-center"
      style={{
        backgroundImage:
          'repeating-linear-gradient(125deg, #000 0, #000 12px, #FFC107 12px, #FFC107 24px)',
      }}
    >
      <button
        className="inline-flex flex-col items-center rounded-lg bg-black/80 px-5 py-1 text-white"
        onClick={openModal}
        type="button"
      >
        <p className="font-semibold">❗️Under Construction 🦺</p>
        <p className="text-xs">(Tap for details)</p>
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Under Construction">
        <section className="px-6 py-4">
          <h4>Hey there! ✌️</h4>
          <p className="my-2 text-justify text-sm">
            Our volunteer crew squeezes in coding on evenings and weekends (yes, sometimes even from
            a ski lift!) to build this app. We’re pushing to have it live before next winter season
            so you can hit the slopes with extra peace of mind. Thanks for your patience and for
            riding along with us!
          </p>
          <p className="mb-4 text-justify text-sm">
            Pardon any issues — we’re still ironing things out, so please be gentle! ☺️
          </p>

          <Link
            className="flex items-center gap-2 text-sm text-primary underline"
            href={feedbackFormURL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Leave Feedback
            <Icon icon="externalLink" size="sm" />
          </Link>

          <Button className="ml-auto" onClick={closeModal}>
            Got it!
          </Button>
        </section>
      </Modal>
    </div>
  )
}

export default WIPBanner
