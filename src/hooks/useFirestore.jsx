import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null };
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (collection, docId, subcollection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // If no subcollection is passed, the ref is just the ref to the session's doc
  let ref = projectFirestore.collection(collection).doc(docId);

  // If a subcollection is passed, the ref is the ref to the session's doc's subcollection
  if (subcollection) {
    ref = ref.collection(subcollection);
  }

  // Only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // Add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const addedDocument = await ref.add(doc);
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // Delete a document and its subcollections
  const deleteDocument = async () => {
    dispatch({ type: 'IS_PENDING' });

    // Function to recursively delete a collection
    const deleteCollection = async (reference, batchSize) => {
      const collectionSnapshot = await reference.limit(batchSize).get();
      if (collectionSnapshot.size === 0) {
        return 0;
      }

      const batch = projectFirestore.batch();
      collectionSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      // Recursively delete remaining docs
      return batchSize + await deleteCollection(reference, batchSize);
    };

    try {
      // Delete the subcollection first
      await deleteCollection(ref.collection('predictions'), 100);

      // Then delete the document
      await ref.delete();

      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' });
    }
  };

  // Update documents
  const updateDocument = async (updates, subDocId) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      if (subDocId) {
        ref = ref.doc(subDocId);
      }
      const updatedDocument = await ref.update(updates);
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
      return updatedDocument;
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
