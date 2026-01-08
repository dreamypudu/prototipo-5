import React from 'react';
import DocumentReader from '../../components/DocumentReader';
import { DOCUMENTS } from '../../data/documents';
import { useMechanicContext } from '../MechanicContext';

const DocumentsMechanic: React.FC = () => {
  const { gameState, actions } = useMechanicContext();
  return (
    <DocumentReader
      documents={DOCUMENTS}
      readDocuments={gameState.readDocuments}
      onMarkAsRead={actions.markDocumentAsRead}
    />
  );
};

export default DocumentsMechanic;
