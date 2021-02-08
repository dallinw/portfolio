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
    if (!collection || !document) {
      return;
    }
    this.collection = collection;
    this.document = document;
    this.field = field || 'photos';
    return (async () => {
      await this.getContent();
      if (field) {
        this.photos = await this.cachePhotos(field);
      }
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
    if (typeof field === 'string') {
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
    } else {
      // todo: obvs this will only work for a specific style of array;
      //    should make this work for any size of array
      this.content &&
        this.content[field[0]] &&
        this.content[field[0]].forEach((photo) => {
          storage
            .child(photo[field[1]])
            .getDownloadURL()
            .then((url) => {
              const img = new Image();
              img.src = url;
              img.setAttribute('alt', photo.title);
              let index = this.content.photos.findIndex(
                (el) => el[field[1]] === photo[field[1]]
              );
              this.content.photos[index] = {
                ...this.content.photos[index],
                img: img,
              };
            });
        });
    }
    return photos;
  }
}

export default ContentFetchService;
