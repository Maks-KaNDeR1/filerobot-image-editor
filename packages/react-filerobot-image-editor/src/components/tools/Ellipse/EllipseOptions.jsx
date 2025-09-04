/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation, useStore } from 'hooks';
import { TOOLS_IDS, TABS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

const EllipseOptions = ({ t }) => {
  const {tabId} = useStore();
  const [ellipse, saveEllipse] = useAnnotation({
    name: TOOLS_IDS.ELLIPSE,
    defaultAnnotation: tabId === TABS_IDS.AI
      ? { fill: '#ac0606', strokeWidth: 2 }
      : undefined,
  });

  return (
    <AnnotationOptions
      className="FIE_ellipse-tool-options"
      annotation={ellipse}
      updateAnnotation={saveEllipse}
      hideStrokeOption={tabId === TABS_IDS.AI} 
      t={t}
    />
  );
};

EllipseOptions.propTypes = {
  t: PropTypes.func.isRequired,
};
export default EllipseOptions;
