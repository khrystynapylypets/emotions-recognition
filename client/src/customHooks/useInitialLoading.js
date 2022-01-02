import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import galleryActions from '../redux/actions/gallery';

export const useGalleryListLoading = () => {
  const dispatch = useDispatch();
  const queriedAt = useSelector((state) => state.gallery.queriedAt);
  const isLoading = useSelector((state) => state.gallery.isLoading);

  useEffect(() => {
    // initial loading
    if (!queriedAt && !isLoading) {
      dispatch(galleryActions.getVideosAction());
    }
  }, [ queriedAt, isLoading ]);

  return {
    isLoading,
    queriedAt,
  };
};
