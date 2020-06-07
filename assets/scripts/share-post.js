class SharePost {
  static create() {
    return new SharePost();
  }

  constructor() {
    this.listenForShare();
  }

  listenForShare() {
    const shareButton = document.querySelector('#shareButton');

    if (!shareButton) {
      return;
    }

    const pageUrl = document.querySelector('.postHeader-pageUrl').innerHTML;
    shareButton.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          url: pageUrl
        });
      } else {
        window.open(`http://twitter.com/intent/tweet?url=${pageUrl}`);
      }
    });
  }
}

SharePost.create();
