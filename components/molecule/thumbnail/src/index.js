import React from 'react'
import PropTypes from 'prop-types'
import AtomImage from '@s-ui/react-atom-image'
import cx from 'classnames'

const BASE_CLASS = 'sui-MoleculeThumbnail'
const CAPTION_CLASS = `${BASE_CLASS}-caption`
const LINK_CLASS = `${BASE_CLASS}-link`

const SIZES = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  XSMALL: 'xsmall'
}

const RATIOS = {
  '1:1': '1-1',
  '4:3': '4-3',
  '16:9': '16-9'
}

const SHAPES = {
  SQUARED: 'squared',
  CIRCLED: 'circled'
}

const MoleculeThumbnail = props => {
  const {
    href,
    size,
    ratio,
    shape,
    target,
    captionText,
    linkFactory: Link,
    alt,
    src,
    placeholder,
    skeleton
  } = props

  const figure = (
    <figure
      className={cx(
        `${BASE_CLASS}`,
        `${BASE_CLASS}--${size}`,
        `${BASE_CLASS}--${ratio}`,
        `${BASE_CLASS}--${shape}`
      )}
    >
      <AtomImage
        src={src}
        alt={alt}
        placeholder={placeholder}
        skeleton={skeleton}
      />
      {captionText && (
        <figcaption className={CAPTION_CLASS}>{captionText}</figcaption>
      )}
    </figure>
  )
  return href ? (
    <Link
      className={LINK_CLASS}
      href={href}
      target={target}
      rel={target === '_blank' && 'noopener'}
    >
      {figure}
    </Link>
  ) : (
    figure
  )
}

MoleculeThumbnail.displayName = 'MoleculeThumbnail'

MoleculeThumbnail.propTypes = {
  /** Image source */
  src: PropTypes.string.isRequired,

  /** Image alt */
  alt: PropTypes.string.isRequired,

  /** Text shown at the bottom of the component */
  captionText: PropTypes.string,

  /* ---------------------------------------- */

  /** Img props to be shown until the image loads */
  // placeholder: PropTypes.object.isRequired,

  /** Img props to be shown if the image fails loading */
  // fallback: PropTypes.object,

  /* ---------------------------------------- */

  /** Image displayed (blurred) while the final image is being loaded */
  placeholder: PropTypes.string,

  /** Image (wireframe, skeleton) displayed (not blurred) while the final image is being loaded */
  skeleton: PropTypes.string,

  /** Spinner (component) displayed while the final image is being loaded */
  spinner: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /** Icon (component) to be displayed in an Error Box when the image cannot be loaded */
  errorIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /** Text to be displayed in an Error Box when the image cannot be loaded */
  errorText: PropTypes.string,

  /** Function to be called when the image cannot be loaded  */
  onError: PropTypes.func,

  /** Function to be called when the image completed its loading  */
  onLoad: PropTypes.func,

  /* ---------------------------------------- */

  /** Anchor link */
  href: PropTypes.string,

  /** Define the target attribute('_self', '_blank', '_parent' or '_top') */
  target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),

  /** Define the size (LARGE, MEDIUM, SMALL or XSMALL) */
  size: PropTypes.oneOf(Object.values(SIZES)),

  /** Define the shape (SQUARED or CIRCLED) */
  shape: PropTypes.oneOf(Object.values(SHAPES)),

  /** Define the ratio ('1:1', '4:3', '16:9') */
  ratio: PropTypes.oneOf(Object.values(RATIOS)),

  /** Factory used to create navigation links */
  linkFactory: PropTypes.func
}

MoleculeThumbnail.defaultProps = {
  target: '_blank',
  size: SIZES.MEDIUM,
  shape: SHAPES.SQUARED,
  ratio: RATIOS['1:1'],
  linkFactory: ({children, ...rest} = {}) => <a {...rest}>{children}</a>
}

export default MoleculeThumbnail

export {
  SIZES as moleculeThumbnailSize,
  RATIOS as moleculeThumbnailRatio,
  SHAPES as moleculeThumbnailShape
}
