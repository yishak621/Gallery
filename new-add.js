function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`yo check the ${selection} is correctly typed`);
}
//constructor
function Gallery(element) {
  this.container = element;
  this.list = [...element.querySelectorAll('.img')];
  //Target
  this.modal = getElement('.modal');
  this.modalImg = getElement('.main-img');
  this.imageName = getElement('.image-name');
  this.modalImages = getElement('.modal-images');
  this.closeBtn = getElement('.close-btn');
  this.nextBtn = getElement('.next-btn');
  this.prevBtn = getElement('.prev-btn');
  //binding
  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.clickImage = this.clickImage.bind(this);
  //event listner
  this.container.addEventListener(
    'click',
    function (e) {
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}
//prototype
Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};
Gallery.prototype.openModal = function (selectedImage, list) {
  this.setMainImage(selectedImage);
  this.modal.classList.add('open');
  this.modalImages.innerHTML = list
    .map(function (image) {
      return `<img src="${
        image.src
      }" data-id="${image.dataset.id}" title="${image.title}" class="${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`;
    })
    .join('');

  //event listner
  this.prevBtn.addEventListener('click', this.prevImage);
  this.nextBtn.addEventListener('click', this.nextImage);
  this.closeBtn.addEventListener('click', this.closeModal);
  this.modalImages.addEventListener('click', this.clickImage);
};
Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeModal);
  this.nextBtn.removeEventListener('click', this.nextImage);
  this.prevBtn.removeEventListener('click', this.prevImage);
  this.modalImages.removeEventListener('click', this.clickImage);
};
Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
};
Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};
Gallery.prototype.clickImage = function (e) {
  if (e.target.classList.contains('modal-img')) {
    const selected = this.modalImages.querySelector('.selected');
    selected.classList.remove('selected');

    this.setMainImage(e.target);
    e.target.classList.add('selected');
  }
};
const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));
