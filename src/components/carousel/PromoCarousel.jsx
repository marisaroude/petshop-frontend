import React, { useEffect, useState } from 'react'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import PromoCard from '../promociones/PromoCard'

const PromoCarousel = props => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  const onSelect = () => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi])

  return (
    <section className="embla flex flex-col items-center w-full">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="flex flex-row gap-2 embla__container">
          {slides?.map((promo, index) => (
            <div
              className={` ${
                slides.length > 3 &&
                `embla__slide ${index === selectedIndex ? 'is-selected' : ''}`
              }`}
              key={index}>
              <div className="embla__slide__number">
                <PromoCard promo={promo} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {slides?.length > 3 && (
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default PromoCarousel
