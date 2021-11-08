import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import galleryActions from '../redux/actions/gallery';

export const useGalleryListLoading = () => {
  const dispatch = useDispatch();
  const galleryListQueriedAt = useSelector((state) => state.gallery.queriedAt);
  const galleryListIsLoading = useSelector((state) => state.gallery.isLoading);

  useEffect(() => {
    // initial loading
    if (!galleryListQueriedAt && !galleryListIsLoading) {
      dispatch(galleryActions.getVideosAction());
    }
  }, [ galleryListQueriedAt ]);
};
