import { storage, db } from '../firebase';

/**
 * A content fetching service to be called from the top level app
 *   to preload content and images into the cache
 */
class ContentFetchService {
  /**
   * Parameters to specify where the images are that should be loaded
   * @param {string} collection
   * @param {string} document
   * @param {string} field
   */
  constructor(collection, document, field) {
    this.collection = collection || 'general';
    this.document = document || 'static';
    this.field = field || 'photos';
    return (async () => {
      await this.getContent();
      this.photos = await this.cachePhotos(field);
      return this;
    })();
  }

  async getContent() {
    await db
      .collection(this.collection)
      .doc(this.document)
      .get()
      .then((result) => {
        this.content = result.data();
      });
  }

  async cachePhotos(field) {
    let photos = {};
    this.content &&
      this.content[field] &&
      this.content[field].forEach((photo) => {
        storage
          .child(photo)
          .getDownloadURL()
          .then((url) => {
            const img = new Image();
            img.src = url;
            photos[photo] = img;
          });
      });
    return photos;
  }
}

export default ContentFetchService;
